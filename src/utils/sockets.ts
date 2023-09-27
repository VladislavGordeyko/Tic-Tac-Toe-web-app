const SERVER_URL = 'ws://localhost:3000';

export const connectSocket = (onMessage: (event: MessageEvent) => void) => {
  const socket = new WebSocket(SERVER_URL);

  socket.onopen = () => {
    console.log('Connected to server');
  };

  socket.onmessage = onMessage;

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
  };

  socket.onclose = (event) => {
    if (event.wasClean) {
      console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
    } else {
      console.error('Connection died');
    }
  };

  return socket;
};