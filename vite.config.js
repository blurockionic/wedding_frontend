import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["redux-persist", "redux-persist/lib/storage"],
  },
  alias: {
    '@shadcn': path.resolve(__dirname, 'node_modules/@shadcn'),
  },
})
