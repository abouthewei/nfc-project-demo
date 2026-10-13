import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { classicOfflineBuild, serveRotarySdk } from "../rotary-vite-plugin";
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), serveRotarySdk(), classicOfflineBuild()],
});
