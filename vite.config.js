import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@google/generative-ai', 'jspdf'] // Add jspdf as well if external
    }
  },
  resolve: {
    alias: {
      '@': '/src' // Custom alias for your src folder
    }
  },
  optimizeDeps: {
    exclude: ['@google/generative-ai'] // Exclude from optimization
  }
});
