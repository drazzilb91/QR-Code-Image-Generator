import { defineConfig } from 'vite';

export default defineConfig({
  // Project root directory (where index.html is located).
  root: '.', 
  // Base public path when served in development or production.
  base: './',
  // Directory to serve as plain static assets. Files in this directory are copied to the root of the outDir during build, and are always served or copied as-is without transform. The value can be a string or an array of strings.
  publicDir: 'public',
  // Options for the development server
  server: {
    host: 'localhost',
	// Port to run the development server on
	port: 5173,
	// Automatically open the app in the browser on server start
	open: false,
	// Enable CORS
	cors: true
  },
    resolve: {
        alias: {
            '@': '/src', // Allows you to use '@' as an alias to the '/src' directory
        },
    },
  // Build options
  build: {
	// Directory to output built files
	outDir: 'dist',
	// Directory (relative to outDir) to nest generated assets under
	assetsDir: 'assets',
	// Whether to generate sourcemaps
	sourcemap: true,
  },
  // More configurations can be added here as needed
});