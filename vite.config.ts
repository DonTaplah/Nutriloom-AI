import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          openai: ['openai'],
          icons: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-helmet-async']
  }
});
