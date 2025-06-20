import { useState, useEffect, useCallback, useRef } from 'react';
import { WebSocketMessage, ServerMessage, ConnectionState } from '../types/websocket';



const STORAGE_KEY = 'chat_user_id';
const CONNECTION_KEY = 'websocket_connection_state';

export function useWebSocket({
  url,
  onMessage,
  onConnect,
  onDisconnect,
  shouldConnect = true
}){
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<'connected' | 'connecting' | 'disconnected' | 'reconnecting'>('disconnected');
  const [userId, setUserId] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef();
  const lastPingTimeRef = useRef<number>(Date.now());
  const isConnectingRef = useRef(false);

  // Generate or retrieve user ID
  const getUserId = useCallback(() => {
    const storedId = localStorage.getItem(STORAGE_KEY);
    if (storedId) {
      return storedId;
    }
    const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEY, newId);
    return newId;
  }, []);

  const persistConnectionState = useCallback(() => {
    if (userId) {
      const state = {
        userId,
        role: 'user',
        timestamp: Date.now()
      };
      localStorage.setItem(CONNECTION_KEY, JSON.stringify(state));
    }
  }, [userId]);

  const clearConnectionState = useCallback(() => {
    localStorage.removeItem(CONNECTION_KEY);
  }, []);

  const startHeartbeat = useCallback(() => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
    }

    pingIntervalRef.current = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.send(JSON.stringify({ type: 'ping' }));
          lastPingTimeRef.current = Date.now();
        } catch (error) {
          console.error('Error sending heartbeat:', error);
        }
      }
    }, 15000); // 15 second heartbeat
  }, []);

  const initializeConnection = useCallback(() => {
    if (isConnectingRef.current || wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('Connection already in progress or established');
      return;
    }

    isConnectingRef.current = true;
    setConnectionState('connecting');
    console.log('Attempting to connect to WebSocket server:', url);

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connection established successfully');
        isConnectingRef.current = false;
        setConnectionState('connected');
        setIsConnected(true);

        // Send login message
        const currentUserId = getUserId();
        setUserId(currentUserId);
        
        const loginMessage = {
          type: 'login',
          userId: currentUserId,
          role: 'user'
        };
        
        try {
          ws.send(JSON.stringify(loginMessage));
          console.log('Login message sent successfully');
        } catch (error) {
          console.error('Error sending login message:', error);
          onMessage?.({
            type: 'error',
            message: 'Failed to send login message',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }

        startHeartbeat();
        persistConnectionState();
        onConnect?.();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (!data || typeof data !== 'object' || !data.type) {
            console.error('Invalid message format:', data);
            return;
          }

          if (data.type === 'pong') {
            lastPingTimeRef.current = Date.now();
            return;
          }

          onMessage?.(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          onMessage?.({
            type: 'error',
            message: 'Failed to parse server message',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        });
        
        isConnectingRef.current = false;
        setIsConnected(false);
        setConnectionState('disconnected');
        clearConnectionState();
        onDisconnect?.();

        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error occurred:', error);
        isConnectingRef.current = false;
        setConnectionState('disconnected');
        onMessage?.({
          type: 'error',
          message: 'WebSocket connection error',
          error: 'Connection error occurred'
        });
      };

    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      isConnectingRef.current = false;
      setConnectionState('disconnected');
    }
  }, [url, onConnect, onDisconnect, onMessage, getUserId, startHeartbeat, persistConnectionState, clearConnectionState]);

  // Effect to handle connection state changes
  useEffect(() => {
    if (shouldConnect) {
      initializeConnection();
    } else {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
      setConnectionState('disconnected');
      setIsConnected(false);
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
  }, [shouldConnect, initializeConnection]);

  const sendMessage = useCallback((message) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify(message));
      } catch (error) {
        console.error('Error sending message:', error);
        onMessage?.({
          type: 'error',
          message: 'Failed to send message',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    } else {
      console.warn('WebSocket is not connected. Message not sent:', message);
    }
  }, [onMessage]);

  return {
    isConnected,
    connectionState,
    sendMessage,
    userId
  };
} 