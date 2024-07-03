import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@google/generative-ai']
    }
  },
  resolve: {
      alias: {
      '@': '/src',  // Custom alias for your src folder

    },
  }
});
