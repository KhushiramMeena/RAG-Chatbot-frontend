import React, { useState, useEffect, useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import {
  createSession,
  sendMessage,
  getChatHistory,
  clearChatHistory,
} from "../services/api";
import { useSocket } from "../hooks/useSocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import SourcesList from "./SourcesList";
import "./ChatInterface.scss";

const ChatInterface = ({ sessionId, onNewSession }) => {
  const [currentSessionId, setCurrentSessionId] = useState(sessionId);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sources, setSources] = useState([]);
  const [showSources, setShowSources] = useState(false);
  const messagesEndRef = useRef(null);
  const { socket, isConnected } = useSocket();

  // Update currentSessionId when sessionId prop changes
  useEffect(() => {
    if (sessionId && sessionId !== currentSessionId) {
      setCurrentSessionId(sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    if (currentSessionId) {
      loadChatHistory();
    } else {
      createNewSession();
    }
  }, [currentSessionId]);

  useEffect(() => {
    if (socket && currentSessionId) {
      socket.emit("join_session", currentSessionId);

      socket.on("new_message", (message) => {
        setMessages((prev) => {
          // Check if message already exists to avoid duplicates
          const messageExists = prev.some((msg) => msg.id === message.id);
          if (messageExists) {
            return prev;
          }
          return [...prev, message];
        });

        // Update sources if this is an assistant message
        if (message.role === "assistant" && message.sources) {
          setSources(message.sources);
          if (message.sources.length > 0) {
            setShowSources(true);
          }
        }

        scrollToBottom();
      });

      socket.on("session_cleared", () => {
        setMessages([]);
        setSources([]);
        toast.success("Chat history cleared");
      });

      return () => {
        socket.off("new_message");
        socket.off("session_cleared");
      };
    }
  }, [socket, currentSessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createNewSession = async () => {
    try {
      setLoading(true);
      const newSession = await createSession();
      setCurrentSessionId(newSession.sessionId);
      setMessages([]);
      setSources([]);
      setShowSources(false);
      onNewSession(newSession.sessionId);
      toast.success("New chat session started");
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error("Failed to create new session");
    } finally {
      setLoading(false);
    }
  };

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      const history = await getChatHistory(currentSessionId);
      setMessages(history.messages || []);

      // Extract sources from the last assistant message
      const lastAssistantMessage = history.messages
        ?.filter((msg) => msg.role === "assistant")
        ?.pop();

      if (lastAssistantMessage?.sources) {
        setSources(lastAssistantMessage.sources);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      toast.error("Failed to load chat history");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || sending) return;

    const userMessage = {
      id: uuidv4(),
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setSending(true);

    try {
      const response = await sendMessage(currentSessionId, messageText);

      // Don't add assistant message here - let socket handle it
      // Just update sources and show sources panel
      setSources(response.sources || []);

      if (response.sources && response.sources.length > 0) {
        setShowSources(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");

      // Remove the user message if sending failed
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setSending(false);
    }
  };

  const handleClearChat = async () => {
    try {
      await clearChatHistory(currentSessionId);
      setMessages([]);
      setSources([]);
      setShowSources(false);
      toast.success("Chat history cleared");
    } catch (error) {
      console.error("Error clearing chat:", error);
      toast.error("Failed to clear chat history");
    }
  };

  const handleNewChat = () => {
    createNewSession();
  };

  if (loading && messages.length === 0) {
    return (
      <div className="chat-interface">
        <div className="chat-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <span className="loading-text">Loading chat...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-interface">
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-title">
            <h2>News Chatbot</h2>
            <div className="connection-status">
              <div
                className={`status-indicator ${
                  isConnected ? "online" : "offline"
                }`}
              ></div>
              <span className="status-text">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>

          <div className="chat-actions">
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleNewChat}
              title="Start new chat"
            >
              <FiRefreshCw size={16} />
            </button>

            {messages.length > 0 && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleClearChat}
                title="Clear chat history"
              >
                Clear Chat
              </button>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="messages-container">
          <MessageList messages={messages} sending={sending} />
          <div ref={messagesEndRef} />
        </div>

        {/* Sources Panel */}
        <AnimatePresence>
          {showSources && sources.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="sources-panel"
            >
              <SourcesList
                sources={sources}
                onClose={() => setShowSources(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Input */}
        <div className="input-container">
          <MessageInput
            onSendMessage={handleSendMessage}
            disabled={sending}
            placeholder="Ask me anything about the news..."
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
