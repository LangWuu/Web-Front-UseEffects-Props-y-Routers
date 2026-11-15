import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' deja las rutas de los archivos relativas, así el build funciona
// igual en localhost, en GitHub Pages o dentro de cualquier subcarpeta.
export default defineConfig({
  plugins: [react()],
  base: './',
});
