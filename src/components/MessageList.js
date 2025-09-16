import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiClock } from "react-icons/fi";
import Message from "./Message";
import "./MessageList.scss";

const MessageList = ({ messages, sending }) => {
  const renderMessage = (message, index) => {
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={`message-wrapper ${message.role}`}
      >
        <Message message={message} />
      </motion.div>
    );
  };

  if (messages.length === 0) {
    return (
      <div className="empty-messages">
        <div className="empty-content">
          <div className="empty-icon">
            <FiMessageCircle size={48} />
          </div>
          <h3 className="empty-title">Welcome to News Chatbot!</h3>
          <p className="empty-message">
            I'm here to help you find information from the latest news articles.
            Ask me anything about current events, politics, technology, sports,
            or any other topic!
          </p>
          <div className="empty-examples">
            <p className="examples-title">Try asking:</p>
            <ul className="examples-list">
              <li>"What's the latest news about technology?"</li>
              <li>"Tell me about recent political developments"</li>
              <li>"What are the top sports stories today?"</li>
              <li>"Summarize the latest economic news"</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      <AnimatePresence>
        {messages.map((message, index) => renderMessage(message, index))}
      </AnimatePresence>

      {sending && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="message-wrapper assistant typing"
        >
          <div className="message">
            <div className="message-avatar">
              <FiMessageCircle size={20} />
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-author">Assistant</span>
                <span className="message-time">
                  <FiClock size={12} />
                  Typing...
                </span>
              </div>
              <div className="message-body">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MessageList;
