/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
  resolve: {
    alias: {
      '~/': new URL('./src/', import.meta.url).pathname,
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
})
