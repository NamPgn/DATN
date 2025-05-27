// src/libs/echo.ts
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

declare global {
  interface Window {
    Pusher: any;
  }
}

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: 'HOANG2K4DEPTRAIDASETUP',
  cluster: 'mt1',
  wsHost: '127.0.0.1',
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ['ws'],
});

export default echo;
