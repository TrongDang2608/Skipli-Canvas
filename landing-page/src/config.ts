export const APP_CONFIG = {
  authUrl: import.meta.env.VITE_APP_URL || 'http://localhost:5173/auth',
  // Nhập YouTube Video ID tại đây (hoặc qua biến môi trường VITE_DEMO_YOUTUBE_ID)
  // Ví dụ link: https://www.youtube.com/watch?v=dQw4w9WgXcQ => ID là 'dQw4w9WgXcQ'
  // Nếu để trống '', hệ thống sẽ tự động dùng video cục bộ /Demo_Video.mp4
  youtubeVideoId: import.meta.env.VITE_DEMO_YOUTUBE_ID || '',
};
