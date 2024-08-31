import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://everycare.site:8000', // 배포용 - 실제 운영 서버의 주소를 사용합니다.
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''), // '/api'를 제거하여 실제 백엔드로 전달합니다.
      },
    },
    watch: {
      usePolling: true, // 핫로딩을 위한 폴링 사용
    },
  },
});
