import { defineConfig } from 'vite'
import path from 'node:path'
import fs from 'node:fs'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'

function copyPreloadPlugin() {
  return {
    name: 'copy-preload',
    writeBundle() {
      const src = path.resolve(__dirname, 'electron/preload.cjs')
      const destDir = path.resolve(__dirname, 'dist-electron')
      const dest = path.join(destDir, 'preload.cjs')
      if (fs.existsSync(src)) {
        fs.mkdirSync(destDir, { recursive: true })
        fs.copyFileSync(src, dest)
      }
    },
    configureServer() {
      const src = path.resolve(__dirname, 'electron/preload.cjs')
      const destDir = path.resolve(__dirname, 'dist-electron')
      const dest = path.join(destDir, 'preload.cjs')
      if (fs.existsSync(src)) {
        fs.mkdirSync(destDir, { recursive: true })
        fs.copyFileSync(src, dest)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      renderer: process.env.NODE_ENV === 'test' ? undefined : {},
    }),
    copyPreloadPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
