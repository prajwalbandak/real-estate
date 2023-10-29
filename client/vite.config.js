import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    hmr: {
      overlay: false,
      },
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        secure:false

      }
    }
  },
 
 
  plugins: [react()],
})
