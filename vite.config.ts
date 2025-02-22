import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/j_travel-react/",
  resolve: {
    alias: {
      "@img": path.resolve(__dirname, "./src/assets/img"),
    },
  },
});
