# RAG Chatbot Frontend

A React-based frontend application for a Retrieval-Augmented Generation (RAG) chatbot that provides intelligent responses based on real-time news articles.

## Live Demo

**Application**: [https://rag-chatbot-hglp.onrender.com/](https://rag-chatbot-hglp.onrender.com/)

## Features

- **Modern UI**: Clean and responsive chat interface
- **Real-time Chat**: Live messaging with WebSocket support
- **Session Management**: Create, switch, and manage multiple chat sessions
- **Message History**: Persistent chat history with session storage
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Graceful error handling and user feedback

## Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: SCSS for modular and maintainable styles
- **State Management**: React hooks (useState, useEffect, useRef)
- **HTTP Client**: Axios for API communication
- **Real-time**: Socket.io client for WebSocket connections
- **Build Tool**: Create React App
- **Deployment**: Render.com (Static Site)

## Components

### Core Components

- `ChatInterface` - Main chat container and message handling
- `MessageList` - Displays chat messages with proper formatting
- `MessageInput` - Input field with send functionality
- `Sidebar` - Session management and navigation
- `Header` - Application header with status information
- `SourcesList` - Displays source citations for responses

### Custom Hooks

- `useSocket` - WebSocket connection management
- `useApi` - API service integration

## API Integration

The frontend communicates with the backend through:

- **REST API**: For session management and message sending
- **WebSocket**: For real-time communication and live updates
- **Environment Configuration**: Dynamic API URL configuration

## Environment Variables

```bash
REACT_APP_API_URL=https://rag-chatbot-backend-uscj.onrender.com/api
REACT_APP_SOCKET_URL=https://rag-chatbot-backend-uscj.onrender.com
```

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm start

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatInterface.js
│   ├── MessageList.js
│   ├── MessageInput.js
│   ├── Sidebar.js
│   ├── Header.js
│   └── SourcesList.js
├── hooks/              # Custom React hooks
│   └── useSocket.js
├── services/           # API services
│   └── api.js
├── App.js             # Main application component
├── App.scss           # Global styles
└── index.js           # Application entry point
```

## Styling

The application uses SCSS for styling with:

- **CSS Variables**: For consistent theming
- **Modular Styles**: Component-specific stylesheets
- **Responsive Design**: Mobile-first approach
- **Modern Layout**: Flexbox and Grid for layouts

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Analyze bundle
npm run analyze
```

## Deployment

The frontend is deployed as a static site on Render.com:

- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Environment**: Production with optimized bundle

