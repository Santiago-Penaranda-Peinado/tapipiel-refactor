// ============================================
// VITE CONFIGURATION - TAPIPIEL
// ============================================
// Este archivo configura Vite para el proyecto Tapipiel
// Incluye optimizaciones, plugins y configuración de build
// ============================================

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // ==========================================
  // CONFIGURACIÓN DEL SERVIDOR DE DESARROLLO
  // ==========================================
  server: {
    host: '0.0.0.0', // Permite acceso desde fuera del contenedor Docker
    port: 5173,       // Puerto por defecto de Vite
    strictPort: true, // Falla si el puerto está ocupado
    
    // Hot Module Replacement (recarga automática)
    hmr: {
      host: 'localhost',
      port: 5173,
    },
    
    // Watch options (vigila cambios en archivos)
    watch: {
      usePolling: true, // Necesario para Docker en Windows
      interval: 1000,   // Revisa cambios cada segundo
    },
  },

  // ==========================================
  // CONFIGURACIÓN DE BUILD (PRODUCCIÓN)
  // ==========================================
  build: {
    outDir: 'dist',           // Carpeta de salida
    assetsDir: 'assets',      // Subcarpeta para assets
    
    // Minificación de código
    minify: 'terser',
    
    // Terser options (optimización de JavaScript)
    terserOptions: {
      compress: {
        drop_console: true,   // Elimina console.log en producción
        drop_debugger: true,  // Elimina debugger
      },
    },
    
    // Tamaño límite para inline base64 (imágenes pequeñas)
    // Si es menor a 4KB, se convierte a base64 inline
    // Si es mayor, se copia como archivo separado
    assetsInlineLimit: 4096, // 4KB
    
    // Chunk splitting (división de código para mejor caching)
    chunkSizeWarningLimit: 1000, // Advertencia si un chunk supera 1MB
    
    // Rollup options (configuración avanzada del bundler)
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Página de agradecimiento después del formulario
        thankyou: resolve(__dirname, 'thank-you.html'),
      },
      
      output: {
        // Nombres de archivos en producción
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organiza assets por tipo de archivo
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/[name]-[hash][extname]`;
          }
          
          if (/woff|woff2|ttf|eot/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          
          if (/css/i.test(ext)) {
            return `assets/[name]-[hash][extname]`;
          }
          
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },

  // ==========================================
  // ALIAS DE RUTAS (IMPORTACIONES ABSOLUTAS)
  // ==========================================
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
    },
  },

  // ==========================================
  // CSS / SCSS CONFIGURATION
  // ==========================================
  css: {
    preprocessorOptions: {
      scss: {
        // Importa variables globales automáticamente en todos los archivos SCSS
        additionalData: `@import "@styles/abstracts/_variables.scss";`,
      },
    },
    
    // Minificación de CSS
    devSourcemap: true, // Source maps en desarrollo
  },

  // ==========================================
  // OPTIMIZACIÓN DE DEPENDENCIAS
  // ==========================================
  optimizeDeps: {
    include: [], // Agregar aquí librerías que den problemas de pre-bundling
  },

  // ==========================================
  // ASSETS (IMÁGENES, FUENTES, ETC.)
  // ==========================================
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],

  // ==========================================
  // PLUGINS (EXTENSIONES DE VITE)
  // ==========================================
  plugins: [
    // Aquí se pueden agregar plugins como:
    // - vite-plugin-html (para templates HTML)
    // - vite-plugin-compression (para gzip/brotli)
    // - vite-plugin-imagemin (optimización de imágenes)
  ],
});
