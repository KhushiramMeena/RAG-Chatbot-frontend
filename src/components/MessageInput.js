import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip } from "react-icons/fi";
import "./MessageInput.scss";

const MessageInput = ({
  onSendMessage,
  disabled,
  placeholder = "Type your message...",
}) => {
  const [message, setMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isComposing) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const canSend = message.trim().length > 0 && !disabled;

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={placeholder}
            disabled={disabled}
            className="message-textarea"
            rows={1}
            maxLength={2000}
          />

          <div className="input-actions">
            <button
              type="button"
              className="btn btn-ghost btn-sm attach-btn"
              disabled={disabled}
              title="Attach file"
            >
              <FiPaperclip size={16} />
            </button>

            <button
              type="submit"
              className={`btn btn-primary btn-sm send-btn ${
                canSend ? "can-send" : ""
              }`}
              disabled={!canSend}
              title="Send message"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>

        <div className="input-footer">
          <div className="char-count">{message.length}/2000</div>
          <div className="input-hint">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
