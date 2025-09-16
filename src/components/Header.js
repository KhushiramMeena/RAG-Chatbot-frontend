import React from "react";
import { FiMenu, FiMessageCircle, FiSettings } from "react-icons/fi";
import "./Header.scss";

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button
            className="btn btn-ghost btn-sm sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FiMenu size={20} />
          </button>

          <div className="header-title">
            <FiMessageCircle size={24} className="header-icon" />
            <h1>News Chatbot</h1>
            <span className="header-subtitle">RAG-Powered</span>
          </div>
        </div>

        <div className="header-right">
          <div className="header-status">
            <div className="status-indicator online"></div>
            <span className="status-text">Online</span>
          </div>

          <button className="btn btn-ghost btn-sm" aria-label="Settings">
            <FiSettings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
