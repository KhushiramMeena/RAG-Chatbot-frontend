import React, { useState, useEffect } from "react";
import { FiPlus, FiMessageSquare, FiClock, FiX } from "react-icons/fi";
import { format } from "date-fns";
import { createSession, getAllSessions } from "../services/api";
import "./Sidebar.scss";

const Sidebar = ({
  isOpen,
  onClose,
  onNewSession,
  onSessionSelect,
  currentSession,
}) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSessions();
    }
  }, [isOpen]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const sessionData = await getAllSessions();
      setSessions(sessionData.sessions || []);
    } catch (error) {
      console.error("Error loading sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSession = async () => {
    try {
      const newSession = await createSession();
      onNewSession(newSession.sessionId);
      loadSessions(); // Refresh the list
    } catch (error) {
      console.error("Error creating new session:", error);
    }
  };

  const handleSessionSelect = (sessionId) => {
    console.log("Sidebar: Selecting session:", sessionId);
    onSessionSelect(sessionId);
  };

  const formatSessionDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = (now - date) / (1000 * 60 * 60);

      if (diffInHours < 1) {
        return "Just now";
      } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)}h ago`;
      } else {
        return format(date, "MMM d");
      }
    } catch (error) {
      return "Unknown";
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sidebar-overlay active" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Chat Sessions</h2>
          <button
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="sidebar-content">
          <button
            className="btn btn-primary new-session-btn"
            onClick={handleNewSession}
          >
            <FiPlus size={16} />
            New Chat
          </button>

          <div className="sessions-list">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <span className="loading-text">Loading sessions...</span>
              </div>
            ) : sessions.length === 0 ? (
              <div className="empty-container">
                <FiMessageSquare size={32} className="empty-icon" />
                <p className="empty-message">No chat sessions yet</p>
                <p className="empty-submessage">
                  Start a new conversation to get going!
                </p>
              </div>
            ) : (
              <div className="sessions">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`session-item ${
                      currentSession === session.id ? "active" : ""
                    }`}
                    onClick={() => handleSessionSelect(session.id)}
                  >
                    <div className="session-info">
                      <div className="session-title">
                        <FiMessageSquare size={16} />
                        <span>
                          {session.messageCount > 0
                            ? session.title || `Chat ${session.id.slice(0, 8)}`
                            : "New Chat"}
                        </span>
                      </div>
                      <div className="session-meta">
                        <span className="session-count">
                          {session.messageCount} messages
                        </span>
                        <span className="session-date">
                          <FiClock size={12} />
                          {formatSessionDate(session.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-stats">
            <span className="stats-text">
              {sessions.length} session{sessions.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
