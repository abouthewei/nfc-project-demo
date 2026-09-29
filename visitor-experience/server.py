#!/usr/bin/env python3
"""Static local preview server for the Nanfeng visitor H5."""

from __future__ import annotations

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent


class PreviewHandler(SimpleHTTPRequestHandler):
    server_version = "NanfengPreview/1.0"

    def end_headers(self) -> None:
        self.send_header("X-Robots-Tag", "noindex, nofollow, noarchive")
        super().end_headers()

    def log_message(self, fmt: str, *args: object) -> None:
        print("[preview] " + (fmt % args))


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the static Nanfeng H5 for local preview.")
    parser.add_argument("--host", default="127.0.0.1", help="interface to bind (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=8787, help="port to serve on (default: 8787)")
    args = parser.parse_args()
    handler = partial(PreviewHandler, directory=str(ROOT))
    server = ThreadingHTTPServer((args.host, args.port), handler)
    print(f"Serving static preview at http://{args.host}:{args.port}/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("Preview stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
