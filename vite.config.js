import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}

const alias = {
  '@': pathResolve("src")
}


// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
    open: true,
    base:'./'
  },
  plugins: [vue()]
})
