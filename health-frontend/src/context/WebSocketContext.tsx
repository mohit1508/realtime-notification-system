import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useNotification } from './NotificationContext';

const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<WebSocket | null>(null);
  const { triggerNotification } = useNotification();

  useEffect(() => {
    // Open a WebSocket connection
    const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;
    socketRef.current = new WebSocket(websocketUrl);

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      triggerNotification(data);
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.warn('WebSocket connection closed.');
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [triggerNotification]);

  return (
    <WebSocketContext.Provider value={socketRef.current}>
      {children}
    </WebSocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
