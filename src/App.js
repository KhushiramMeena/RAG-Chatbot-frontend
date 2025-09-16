import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ChatInterface from "./components/ChatInterface";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.scss";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    // Initialize app
    console.log("News Chatbot App initialized");
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNewSession = (sessionId) => {
    console.log("Creating new session:", sessionId);
    setCurrentSession(sessionId);
    setSidebarOpen(false);
  };

  const handleSessionSelect = (sessionId) => {
    console.log("Selecting session:", sessionId);
    setCurrentSession(sessionId);
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />

        <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <div className="app-content">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onNewSession={handleNewSession}
            onSessionSelect={handleSessionSelect}
            currentSession={currentSession}
          />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <ChatInterface
                    sessionId={currentSession}
                    onNewSession={handleNewSession}
                  />
                }
              />
              <Route
                path="/chat/:sessionId"
                element={
                  <ChatInterface
                    sessionId={currentSession}
                    onNewSession={handleNewSession}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
