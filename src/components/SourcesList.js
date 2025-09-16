import React from "react";
import { FiExternalLink, FiX, FiCalendar, FiGlobe } from "react-icons/fi";
import { format } from "date-fns";
import "./SourcesList.scss";

const SourcesList = ({ sources, onClose }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy");
    } catch (error) {
      return "Unknown date";
    }
  };

  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch (error) {
      return "Unknown source";
    }
  };

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="sources-list">
      <div className="sources-header">
        <div className="sources-title">
          <FiGlobe size={16} />
          <span>Sources ({sources.length})</span>
        </div>
        <button
          className="btn btn-ghost btn-sm close-btn"
          onClick={onClose}
          aria-label="Close sources"
        >
          <FiX size={16} />
        </button>
      </div>

      <div className="sources-content">
        {sources.map((source, index) => (
          <div key={index} className="source-item">
            <div className="source-header">
              <h4 className="source-title">{source.title}</h4>
              <div className="source-meta">
                <span className="source-domain">
                  <FiGlobe size={12} />
                  {getDomain(source.url)}
                </span>
                {source.publishedAt && (
                  <span className="source-date">
                    <FiCalendar size={12} />
                    {formatDate(source.publishedAt)}
                  </span>
                )}
              </div>
            </div>

            <div className="source-actions">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm source-link"
              >
                <FiExternalLink size={14} />
                Read Article
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourcesList;
