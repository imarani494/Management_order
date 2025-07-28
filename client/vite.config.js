import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://order-management-system-bm76.onrender.com", // ✅ removed trailing slash
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
