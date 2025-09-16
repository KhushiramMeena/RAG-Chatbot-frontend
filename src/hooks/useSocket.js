import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SOCKET_URL || "https://rag-chatbot-backend-uscj.onrender.com"
    : process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    // Connection event handlers
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      setIsConnected(true);
      setConnectionError(null);
      reconnectAttemptsRef.current = 0;

      // Clear any pending reconnect timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);

      if (reason === "io server disconnect") {
        // Server initiated disconnect, try to reconnect
        handleReconnect();
      }
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setConnectionError(error.message);
      setIsConnected(false);
      handleReconnect();
    });

    newSocket.on("reconnect", (attemptNumber) => {
      console.log("Socket reconnected after", attemptNumber, "attempts");
      setIsConnected(true);
      setConnectionError(null);
      reconnectAttemptsRef.current = 0;
    });

    newSocket.on("reconnect_attempt", (attemptNumber) => {
      console.log("Socket reconnect attempt:", attemptNumber);
      reconnectAttemptsRef.current = attemptNumber;
    });

    newSocket.on("reconnect_error", (error) => {
      console.error("Socket reconnect error:", error);
      setConnectionError(error.message);
    });

    newSocket.on("reconnect_failed", () => {
      console.error(
        "Socket reconnect failed after",
        maxReconnectAttempts,
        "attempts"
      );
      setConnectionError("Failed to reconnect to server");
      setIsConnected(false);
    });

    setSocket(newSocket);

    // Cleanup function
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      newSocket.close();
    };
  }, []);

  const handleReconnect = () => {
    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      const delay = Math.min(
        1000 * Math.pow(2, reconnectAttemptsRef.current),
        5000
      );

      reconnectTimeoutRef.current = setTimeout(() => {
        if (socket && !socket.connected) {
          console.log("Attempting to reconnect...");
          socket.connect();
        }
      }, delay);
    }
  };

  const emit = (event, data) => {
    if (socket && isConnected) {
      socket.emit(event, data);
    } else {
      console.warn("Socket not connected, cannot emit event:", event);
    }
  };

  const on = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  const off = (event, callback) => {
    if (socket) {
      socket.off(event, callback);
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  const connect = () => {
    if (socket && !socket.connected) {
      socket.connect();
    }
  };

  return {
    socket,
    isConnected,
    connectionError,
    emit,
    on,
    off,
    disconnect,
    connect,
    reconnectAttempts: reconnectAttemptsRef.current,
  };
};
