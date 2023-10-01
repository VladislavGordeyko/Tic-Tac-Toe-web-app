import React, { createContext, useContext } from 'react';
import useWebSocket from 'react-use-websocket';
import { IWebSocketContext, IWebSocketProvider } from './models';

const WebSocketContext = createContext<IWebSocketContext | undefined>(undefined);

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider: React.FC<IWebSocketProvider> = ({ children, sessionId }) => {
  const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:3000';
  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(WEBSOCKET_URL, {
    onOpen: () => {
      if (sessionId) {
        sendMessage(JSON.stringify({ type: 'JOIN_SESSION', sessionId, telegramData: window.Telegram.WebApp.initDataUnsafe }));
      } else {
        sendMessage(JSON.stringify({ type: 'CREATE_SESSION', telegramData: window.Telegram.WebApp.initDataUnsafe }));
      }
    },
    shouldReconnect: (closeEvent) => true,
  });

  return (
    <WebSocketContext.Provider value={{ sendMessage, lastMessage, readyState }}>
      {children}
    </WebSocketContext.Provider>
  );
};
