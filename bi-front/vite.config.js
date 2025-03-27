import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  preview: {
    port: 3017,
    strictPort: true,
  },
  server: {
    port: 3017,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3017",
  },
});
