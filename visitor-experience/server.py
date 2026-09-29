#!/usr/bin/env python3
"""Local development service for the Nanfeng Open Kiln H5.

This small standard-library server is for local prototyping only. Public
deployment needs a hardened API and private object storage.
"""

from __future__ import annotations

import argparse
import base64
import binascii
import json
import mimetypes
import secrets
import shutil
import threading
from datetime import datetime, timedelta, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
STORIES = DATA / "stories"
UPLOADS = DATA / "uploads"
MAX_BODY_BYTES = 36 * 1024 * 1024
MAX_MEDIA_BYTES = 8 * 1024 * 1024
RETENTION_DAYS = 30
CHAPTER_IDS = ("kiln", "banyan", "craft")
MIME_EXTENSIONS = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "video/mp4": ".mp4",
    "video/quicktime": ".mov",
    "video/webm": ".webm",
}


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def read_story(story_id: str) -> dict | None:
    if not story_id.isalnum() or len(story_id) > 64:
        return None
    path = STORIES / (story_id + ".json")
    if not path.is_file():
        return None
    try:
        story = json.loads(path.read_text("utf-8"))
    except (OSError, json.JSONDecodeError):
        return None
    return story if isinstance(story, dict) else None


def remove_story(story_id: str, story: dict) -> None:
    for chapter in story.get("chapters", []):
        media = chapter.get("media") or {}
        filename = media.get("filename")
        if filename and Path(filename).name == filename:
            (UPLOADS / filename).unlink(missing_ok=True)
    (STORIES / (story_id + ".json")).unlink(missing_ok=True)


def cleanup_expired() -> None:
    now = utc_now()
    for path in STORIES.glob("*.json"):
        story = read_story(path.stem)
        if not story:
            path.unlink(missing_ok=True)
            continue
        expires = story.get("expiresAt")
        try:
            expires_at = datetime.fromisoformat(expires.replace("Z", "+00:00"))
        except (AttributeError, ValueError):
            continue
        if expires_at <= now:
            remove_story(path.stem, story)


def public_story(story: dict) -> dict:
    result = {key: value for key, value in story.items() if key not in {"manageToken", "mediaFiles"}}
    for chapter in result.get("chapters", []):
        media = chapter.pop("media", None)
        if media:
            chapter["mediaUrl"] = "/uploads/" + media["filename"]
            chapter["kind"] = media["kind"]
        else:
            chapter["mediaUrl"] = None
    return result


class Handler(SimpleHTTPRequestHandler):
    server_version = "NanfengOpenKiln/0.1"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        print("[H5]", fmt % args)

    def end_headers(self):
        self.send_header("X-Robots-Tag", "noindex, nofollow, noarchive")
        super().end_headers()

    def send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = unquote(urlsplit(self.path).path)
        if path == "/api/health":
            self.send_json(200, {"ok": True, "service": "nanfeng-open-kiln-local"})
            return
        if path.startswith("/api/stories/"):
            story_id = path.rsplit("/", 1)[-1]
            story = read_story(story_id)
            if not story:
                self.send_json(404, {"error": "没有找到这份作品。"})
                return
            try:
                expires_at = datetime.fromisoformat(story["expiresAt"].replace("Z", "+00:00"))
            except (KeyError, ValueError):
                expires_at = utc_now() + timedelta(days=1)
            if expires_at <= utc_now():
                remove_story(story_id, story)
                self.send_json(410, {"error": "这份开窑记已到期。"})
                return
            self.send_json(200, public_story(story))
            return
        if path.startswith("/uploads/"):
            filename = Path(path.rsplit("/", 1)[-1]).name
            target = UPLOADS / filename
            if not target.is_file():
                self.send_error(404, "File not found")
                return
            content_type = mimetypes.guess_type(filename)[0] or "application/octet-stream"
            if filename.endswith(".mov"):
                content_type = "video/quicktime"
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(target.stat().st_size))
            self.send_header("Cache-Control", "private, max-age=3600")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            with target.open("rb") as file:
                shutil.copyfileobj(file, self.wfile)
            return
        if path == "/data" or path.startswith("/data/") or path in {"/server.py", "/README.md", "/.gitignore"} or path.startswith("/design/"):
            self.send_error(404, "Not found")
            return
        if path.startswith("/api/"):
            self.send_json(404, {"error": "接口不存在。"})
            return
        super().do_GET()

    def do_POST(self):
        if urlsplit(self.path).path != "/api/stories":
            self.send_json(404, {"error": "接口不存在。"})
            return
        length = self.headers.get("Content-Length", "")
        try:
            size = int(length)
        except ValueError:
            self.send_json(411, {"error": "请求缺少内容长度。"})
            return
        if size <= 0 or size > MAX_BODY_BYTES:
            self.send_json(413, {"error": "上传内容过大，请减少视频或改用照片。"})
            return
        try:
            payload = json.loads(self.rfile.read(size))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self.send_json(400, {"error": "作品数据格式无效。"})
            return
        if not isinstance(payload, dict):
            self.send_json(400, {"error": "作品数据格式无效。"})
            return
        try:
            self.create_story(payload)
        except ValueError as error:
            self.send_json(400, {"error": str(error)})
        except OSError:
            self.send_json(500, {"error": "本地存储暂时不可用，请重试。"})

    def do_PUT(self):
        path = unquote(urlsplit(self.path).path)
        if not path.startswith("/api/stories/"):
            self.send_json(404, {"error": "接口不存在。"})
            return
        story_id = path.rsplit("/", 1)[-1]
        existing = read_story(story_id)
        if not existing:
            self.send_json(404, {"error": "没有找到这份作品。"})
            return
        token = self.headers.get("X-Manage-Token", "")
        if not token or not secrets.compare_digest(token, str(existing.get("manageToken", ""))):
            self.send_json(403, {"error": "只有创建者可以修改这份作品。"})
            return
        length = self.headers.get("Content-Length", "")
        try:
            size = int(length)
        except ValueError:
            self.send_json(411, {"error": "请求缺少内容长度。"})
            return
        if size <= 0 or size > MAX_BODY_BYTES:
            self.send_json(413, {"error": "上传内容过大，请减少视频或改用照片。"})
            return
        try:
            payload = json.loads(self.rfile.read(size))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self.send_json(400, {"error": "作品数据格式无效。"})
            return
        if not isinstance(payload, dict):
            self.send_json(400, {"error": "作品数据格式无效。"})
            return
        try:
            self.create_story(payload, existing=existing)
        except ValueError as error:
            self.send_json(400, {"error": str(error)})
        except OSError:
            self.send_json(500, {"error": "本地存储暂时不可用，请重试。"})

    def create_story(self, payload: dict, existing: dict | None = None) -> None:
        title = str(payload.get("title", "")).strip()[:48]
        mood = str(payload.get("mood", "slow"))
        chapters = payload.get("chapters")
        if not title:
            raise ValueError("先给作品起个名字吧。")
        if mood not in {"slow", "warm", "quiet", "surprise"}:
            raise ValueError("作品主题无效，请重新选择。")
        if not isinstance(chapters, list) or len(chapters) != 3:
            raise ValueError("作品需要包含三段章节结构。")
        if tuple(str(chapter.get("id", "")) for chapter in chapters) != CHAPTER_IDS:
            raise ValueError("章节顺序无效，请重新打开创作页。")

        story_id = existing["storyId"] if existing else secrets.token_urlsafe(18).replace("-", "").replace("_", "")
        manage_token = existing["manageToken"] if existing else secrets.token_urlsafe(28)
        created_at = utc_now()
        expires_at = utc_now() + timedelta(days=RETENTION_DAYS)
        saved_files: list[str] = []
        stored_chapters = []
        try:
            for chapter in chapters:
                media = chapter.get("media")
                stored_media = None
                if media:
                    if not isinstance(media, dict):
                        raise ValueError("素材数据无效，请重新选择。")
                    kind = media.get("kind")
                    data_url = str(media.get("data", ""))
                    if kind not in {"image", "video"} or "," not in data_url:
                        raise ValueError("素材格式无效，请重新选择。")
                    header, encoded = data_url.split(",", 1)
                    mime = header.partition(":")[2].partition(";")[0].lower()
                    extension = MIME_EXTENSIONS.get(mime)
                    if not extension:
                        raise ValueError("暂不支持这种素材格式。请用 JPG、PNG、WebP、MP4、MOV 或 WebM。")
                    if kind == "image" and not mime.startswith("image/"):
                        raise ValueError("照片格式与素材类型不匹配。")
                    if kind == "video" and not mime.startswith("video/"):
                        raise ValueError("视频格式与素材类型不匹配。")
                    try:
                        content = base64.b64decode(encoded, validate=True)
                    except (binascii.Error, ValueError):
                        raise ValueError("素材上传不完整，请重新选择。")
                    if not content or len(content) > MAX_MEDIA_BYTES:
                        raise ValueError("单个素材需要小于 8 MB。")
                    media_id = secrets.token_hex(14)
                    filename = media_id + extension
                    (UPLOADS / filename).write_bytes(content)
                    saved_files.append(filename)
                    stored_media = {"filename": filename, "kind": kind, "mime": mime}
                stored_chapters.append({
                    "id": str(chapter["id"]),
                    "spotId": str(chapter.get("spotId", ""))[:40],
                    "title": str(chapter.get("title", "")).strip()[:48],
                    "caption": str(chapter.get("caption", "")).strip()[:160],
                    "skipped": bool(chapter.get("skipped")),
                    "stampCollected": bool(chapter.get("stampCollected")),
                    "media": stored_media,
                })
            if not any(chapter["media"] for chapter in stored_chapters):
                raise ValueError("至少添加一张照片或一段短片。")
            story = {
                "storyId": story_id,
                "templateId": "nanfeng-open-kiln-v1",
                "locale": "zh-CN",
                "title": title,
                "mood": mood,
                "stamps": {key: bool(value) for key, value in (payload.get("stamps") or {}).items() if key in CHAPTER_IDS},
                "chapters": stored_chapters,
                "createdAt": created_at.isoformat().replace("+00:00", "Z"),
                "expiresAt": expires_at.isoformat().replace("+00:00", "Z"),
                "visibility": "unlisted",
                "manageToken": manage_token,
            }
            (STORIES / (story_id + ".json")).write_text(json.dumps(story, ensure_ascii=False, indent=2), "utf-8")
            if existing:
                old_files = {
                    chapter.get("media", {}).get("filename")
                    for chapter in existing.get("chapters", [])
                    if chapter.get("media")
                }
                for filename in old_files - set(saved_files):
                    if filename and Path(filename).name == filename:
                        (UPLOADS / filename).unlink(missing_ok=True)
                self.send_json(200, {"story": public_story(story)})
            else:
                self.send_json(201, {
                    "story": public_story(story),
                    "manageToken": manage_token,
                })
        except Exception:
            for filename in saved_files:
                (UPLOADS / filename).unlink(missing_ok=True)
            raise

    def do_DELETE(self):
        path = unquote(urlsplit(self.path).path)
        if not path.startswith("/api/stories/"):
            self.send_json(404, {"error": "接口不存在。"})
            return
        story_id = path.rsplit("/", 1)[-1]
        story = read_story(story_id)
        if not story:
            self.send_json(404, {"error": "没有找到这份作品。"})
            return
        token = self.headers.get("X-Manage-Token", "")
        if not token or not secrets.compare_digest(token, str(story.get("manageToken", ""))):
            self.send_json(403, {"error": "只有创建者可以删除这份作品。"})
            return
        remove_story(story_id, story)
        self.send_json(200, {"deleted": True})


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the local Nanfeng Open Kiln H5.")
    parser.add_argument("--host", default="127.0.0.1", help="Bind address. Defaults to loopback only.")
    parser.add_argument("--port", type=int, default=8787)
    args = parser.parse_args()
    STORIES.mkdir(parents=True, exist_ok=True)
    UPLOADS.mkdir(parents=True, exist_ok=True)
    cleanup_expired()
    server = ThreadingHTTPServer((args.host, args.port), Handler)
    print("南风开窑记 running at http://%s:%s" % (args.host, args.port))
    print("Local prototype: uploaded media is stored under ./data and expires after %s days." % RETENTION_DAYS)
    stop_cleanup = threading.Event()
    cleanup_worker = threading.Thread(
        target=lambda: cleanup_worker_loop(stop_cleanup),
        name="expire-local-stories",
        daemon=True,
    )
    cleanup_worker.start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping local server.")
    finally:
        stop_cleanup.set()
        server.server_close()


def cleanup_worker_loop(stop_event: threading.Event) -> None:
    while not stop_event.wait(3600):
        cleanup_expired()


if __name__ == "__main__":
    main()
