import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(resolve(__dirname, "cert/localhost+2-key.pem")),
      cert: fs.readFileSync(resolve(__dirname, "cert/localhost+2.pem")),
    },
    port: 5173,
  },
});
