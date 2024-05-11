import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 20000, // Adjust the limit as needed
  },
  define: {
    "process.env.REACT_APP_API_URL": JSON.stringify(
      process.env.BACKEND_HOST + "/api"
    ),
  },
});

