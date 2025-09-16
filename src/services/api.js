import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api"
    : process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error);

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`Error ${status}:`, data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something else happened
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Session management
export const createSession = async () => {
  try {
    const response = await api.post("/chat/session");
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create session: ${error.message}`);
  }
};

export const getSession = async (sessionId) => {
  try {
    const response = await api.get(`/session/${sessionId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get session: ${error.message}`);
  }
};

export const getAllSessions = async () => {
  try {
    const response = await api.get("/session");
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get sessions: ${error.message}`);
  }
};

export const deleteSession = async (sessionId) => {
  try {
    const response = await api.delete(`/session/${sessionId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete session: ${error.message}`);
  }
};

// Chat management
export const sendMessage = async (sessionId, message, streaming = false) => {
  try {
    const response = await api.post("/chat/message", {
      sessionId,
      message,
      streaming,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to send message: ${error.message}`);
  }
};

export const getChatHistory = async (sessionId) => {
  try {
    const response = await api.get(`/chat/history/${sessionId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get chat history: ${error.message}`);
  }
};

export const clearChatHistory = async (sessionId) => {
  try {
    const response = await api.delete(`/chat/history/${sessionId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to clear chat history: ${error.message}`);
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    throw new Error(`Health check failed: ${error.message}`);
  }
};

// Chat health check
export const chatHealthCheck = async () => {
  try {
    const response = await api.get("/chat/health");
    return response.data;
  } catch (error) {
    throw new Error(`Chat health check failed: ${error.message}`);
  }
};

// Session health check
export const sessionHealthCheck = async () => {
  try {
    const response = await api.get("/session/health/check");
    return response.data;
  } catch (error) {
    throw new Error(`Session health check failed: ${error.message}`);
  }
};

// Utility functions
export const isApiAvailable = async () => {
  try {
    await healthCheck();
    return true;
  } catch (error) {
    return false;
  }
};

export const getApiStatus = async () => {
  try {
    const [health, chatHealth, sessionHealth] = await Promise.all([
      healthCheck(),
      chatHealthCheck(),
      sessionHealthCheck(),
    ]);

    return {
      api: health.status === "OK",
      chat: chatHealth.success,
      session: sessionHealth.success,
      timestamp: health.timestamp,
    };
  } catch (error) {
    return {
      api: false,
      chat: false,
      session: false,
      error: error.message,
    };
  }
};

export default api;
