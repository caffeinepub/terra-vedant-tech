import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Isolate React and React-DOM into a stable vendor chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Isolate other large stable vendor libraries
          if (id.includes('node_modules/@radix-ui/') || id.includes('node_modules/lucide-react/')) {
            return 'vendor-ui';
          }
          // Isolate dfinity/ICP libraries
          if (id.includes('node_modules/@dfinity/') || id.includes('node_modules/@icp-sdk/')) {
            return 'vendor-icp';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
