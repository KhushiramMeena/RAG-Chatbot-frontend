# RAG-Powered News Chatbot - Frontend

A modern React frontend for the RAG-powered news chatbot. Features a beautiful chat interface with real-time communication, session management, and responsive design.

## 🚀 Features

- **Modern UI**: Clean, responsive design with SCSS styling
- **Real-time Chat**: Socket.io integration for instant messaging
- **Session Management**: Create, switch, and manage chat sessions
- **Message History**: Persistent chat history with Redis backend
- **Source Citations**: Display article sources with links
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: Adaptive theming system
- **Animations**: Smooth transitions with Framer Motion
- **Error Handling**: Comprehensive error states and recovery
- **Loading States**: User-friendly loading indicators

## 🛠 Tech Stack

- **Framework**: React 18
- **Styling**: SCSS with CSS Variables
- **Real-time**: Socket.io Client
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Date Handling**: date-fns
- **Markdown**: React Markdown
- **Code Highlighting**: React Syntax Highlighter
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend server running (see backend README)

## 🔧 Installation

1. **Clone and navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   # API Configuration
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000

   # Application Configuration
   REACT_APP_APP_NAME=News Chatbot
   REACT_APP_ENVIRONMENT=development
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## 🚀 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🎨 UI Components

### Core Components

- **App**: Main application wrapper with routing
- **Header**: Top navigation with sidebar toggle
- **Sidebar**: Session management and navigation
- **ChatInterface**: Main chat area with message list
- **MessageList**: Scrollable message container
- **Message**: Individual message component with markdown support
- **MessageInput**: Text input with auto-resize and send functionality
- **SourcesList**: Collapsible sources panel

### Features

- **Session Sidebar**: Create new chats, view history, switch sessions
- **Message Types**: User messages (right-aligned), Assistant messages (left-aligned)
- **Markdown Support**: Rich text rendering with code highlighting
- **Source Links**: Clickable links to original articles
- **Typing Indicators**: Real-time typing animation
- **Connection Status**: Visual connection indicator
- **Responsive Layout**: Mobile-optimized interface

## 🎯 User Experience

### Chat Interface

- Clean, distraction-free chat interface
- Message bubbles with proper alignment
- Timestamp display for each message
- Avatar icons for user and assistant
- Smooth animations for new messages

### Session Management

- Sidebar with session list
- Create new sessions with one click
- Session metadata (message count, last activity)
- Clear chat history functionality
- Mobile-responsive sidebar

### Real-time Features

- Instant message delivery
- Typing indicators
- Connection status monitoring
- Automatic reconnection
- Error handling and recovery

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations

- Collapsible sidebar
- Touch-friendly buttons
- Optimized input areas
- Swipe gestures
- Reduced animations for performance

## 🎨 Theming System

### CSS Variables

```scss
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --background-color: #ffffff;
  --text-primary: #1e293b;
  --border-color: #e2e8f0;
  // ... more variables
}
```

### Theme Features

- Consistent color palette
- Adaptive contrast
- Smooth transitions
- Dark mode support (ready for implementation)

## 🔌 API Integration

### REST API

- Session management
- Message sending/receiving
- Chat history retrieval
- Health checks

### Socket.io

- Real-time messaging
- Session joining/leaving
- Connection status
- Error handling

### Error Handling

- Network error recovery
- Retry mechanisms
- User-friendly error messages
- Graceful degradation

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Building for Production

```bash
# Build the app
npm run build

# Serve the build locally
npx serve -s build
```

### Build Optimization

- Code splitting
- Asset optimization
- Bundle analysis
- Performance monitoring

## 📦 Deployment

### Environment Variables for Production

```env
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_SOCKET_URL=https://your-api-domain.com
REACT_APP_ENVIRONMENT=production
```

### Static Hosting

The built application can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop build folder
- **GitHub Pages**: Use gh-pages package
- **AWS S3**: Upload build folder
- **Firebase Hosting**: `firebase deploy`

### Docker Deployment

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 Configuration

### API Configuration

```javascript
// src/services/api.js
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
```

### Socket Configuration

```javascript
// src/hooks/useSocket.js
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
```

### Feature Flags

```env
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG=true
```

## 🎯 Performance Optimization

### Code Splitting

- Route-based splitting
- Component lazy loading
- Dynamic imports

### Bundle Optimization

- Tree shaking
- Dead code elimination
- Asset compression
- Caching strategies

### Runtime Performance

- React.memo for components
- useMemo for expensive calculations
- useCallback for event handlers
- Virtual scrolling (for large message lists)

## 🐛 Troubleshooting

### Common Issues

1. **Socket Connection Failed**

   - Check REACT_APP_SOCKET_URL
   - Verify backend server is running
   - Check network connectivity

2. **API Calls Failing**

   - Verify REACT_APP_API_URL
   - Check CORS configuration
   - Verify backend endpoints

3. **Build Errors**

   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

4. **Styling Issues**
   - Check SCSS compilation
   - Verify CSS variable definitions
   - Clear browser cache

### Debug Mode

```bash
# Enable debug logging
REACT_APP_DEBUG=true npm start
```

## 📊 Analytics & Monitoring

### Performance Monitoring

- Bundle size analysis
- Runtime performance metrics
- User interaction tracking
- Error reporting

### User Analytics

- Session duration
- Message frequency
- Feature usage
- Error rates

## 🔒 Security Considerations

- **XSS Prevention**: Input sanitization
- **CSRF Protection**: Token validation
- **Content Security Policy**: Strict CSP headers
- **Secure Headers**: Security-focused headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Update documentation
6. Submit a pull request

### Development Guidelines

- Follow React best practices
- Use TypeScript for new components
- Write comprehensive tests
- Maintain responsive design
- Follow accessibility guidelines

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the troubleshooting section
- Review the component documentation

---

**Built with ❤️ for Voosh Assignment**
