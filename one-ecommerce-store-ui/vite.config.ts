import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any frontend call to /api/* will be forwarded to the Node server.
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
})
