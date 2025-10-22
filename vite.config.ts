import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate large vendor libraries into their own chunks
          if (id.includes('node_modules')) {
            // React core libraries
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            
            // Framer Motion (animation library - large)
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            
            // Internationalization
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n';
            }
            
            // Icons
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            
            // All other vendor libraries
            return 'vendor';
          }
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Minification settings for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
      }
    },
    
    // Enable source maps for debugging (optional)
    sourcemap: false, // Set to true if you want source maps in production
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true, // Automatically open browser
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
  }
});
