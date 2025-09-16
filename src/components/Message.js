import React from "react";
import {
  FiUser,
  FiMessageCircle,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Message.scss";

const Message = ({ message }) => {
  const formatMessageTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return format(date, "HH:mm");
    } catch (error) {
      return "Unknown";
    }
  };

  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <div className={`message ${message.role}`}>
      <div className="message-avatar">
        {isUser ? <FiUser size={20} /> : <FiMessageCircle size={20} />}
      </div>

      <div className="message-content">
        <div className="message-header">
          <span className="message-author">{isUser ? "You" : "Assistant"}</span>
          <span className="message-time">
            <FiClock size={12} />
            {formatMessageTime(message.timestamp)}
          </span>
        </div>

        <div className="message-body">
          {isAssistant ? (
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return <p className="markdown-paragraph">{children}</p>;
                },
                ul({ children }) {
                  return <ul className="markdown-list">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="markdown-list">{children}</ol>;
                },
                li({ children }) {
                  return <li className="markdown-list-item">{children}</li>;
                },
                strong({ children }) {
                  return (
                    <strong className="markdown-strong">{children}</strong>
                  );
                },
                em({ children }) {
                  return <em className="markdown-emphasis">{children}</em>;
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="markdown-blockquote">
                      {children}
                    </blockquote>
                  );
                },
                a({ children, href }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="markdown-link"
                    >
                      {children}
                      <FiExternalLink size={12} />
                    </a>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <div className="message-text">{message.content}</div>
          )}
        </div>

        {isAssistant && message.sources && message.sources.length > 0 && (
          <div className="message-sources">
            <div className="sources-header">
              <span className="sources-title">Sources:</span>
            </div>
            <div className="sources-list">
              {message.sources.slice(0, 3).map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  <span className="source-title">{source.title}</span>
                  <span className="source-domain">
                    {new URL(source.url).hostname}
                  </span>
                  <FiExternalLink size={12} />
                </a>
              ))}
              {message.sources.length > 3 && (
                <span className="more-sources">
                  +{message.sources.length - 3} more sources
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
