# X-Recruit Development Setup

This guide will help you set up and run the X-Recruit project locally.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

## Quick Start

### Option 1: Automated Setup (Recommended)

#### Using PowerShell:
```powershell
.\start-dev.ps1
```

#### Using Command Prompt:
```cmd
start-dev.bat
```

### Option 2: Manual Setup

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Start Backend Server
In one terminal:
```bash
npm run backend
```

#### 3. Start Frontend Development Server
In another terminal:
```bash
npm run dev
```

### Option 3: Run Both Simultaneously
```bash
npm run start:all
```

## Access Points

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## Project Structure

```
X-Recruit/
├── backend/
│   ├── server.cjs          # Express.js backend server
│   ├── database.sqlite     # SQLite database
│   └── .env               # Environment variables
├── src/                   # React frontend source
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   └── hooks/            # Custom React hooks
├── start-dev.ps1         # PowerShell startup script
├── start-dev.bat         # Batch startup script
└── package.json          # Project dependencies
```

## Features

### Backend (Express.js + SQLite)
- User authentication (register/login)
- JWT token-based security
- SQLite database for user management
- CORS enabled for frontend communication
- RESTful API endpoints

### Frontend (React + Vite + TypeScript)
- Modern React with TypeScript
- Vite for fast development
- TailwindCSS for styling
- Radix UI components
- React Router for navigation
- Enhanced Roadmap Generator with AI integration

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile (protected)

### Health Check
- `GET /api/health` - Server health status

## Environment Variables

The backend uses the following environment variables (in `backend/.env`):

```env
PORT=3001
JWT_SECRET=xrecruit_super_secure_jwt_secret_key_2024_production_ready
NODE_ENV=development
```

## Development Commands

```bash
# Install dependencies
npm install

# Start frontend only
npm run dev

# Start backend only
npm run backend

# Start backend with auto-reload
npm run backend:dev

# Start both frontend and backend
npm run start:all

# Build frontend for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Roadmap Generator Features

The enhanced roadmap generator now includes:

- **Comprehensive Resource Types**: Documentation, courses, books, videos, GitHub repos, tools, and communities
- **AI Integration**: OpenAI GPT-4 and local Ollama support
- **Mock Data**: Rich sample roadmaps for testing
- **PDF Export**: Generate downloadable roadmap PDFs
- **Interactive UI**: Step-by-step visualization with progress tracking

### Resource Types Supported

- 📚 **Books**: Technical books and references
- 🎥 **Videos**: YouTube tutorials and courses
- 🎓 **Courses**: Online learning platforms (Coursera, Udemy, freeCodeCamp)
- 📄 **Articles**: Documentation and blog posts
- 🔧 **Tools**: Development tools and utilities
- 🐙 **GitHub**: Source code repositories and curated lists
- 👥 **Communities**: Forums, Discord servers, and professional networks

## Troubleshooting

### Port Already in Use
If you get an "EADDRINUSE" error:

```bash
# Windows - Find and kill process using port 3001
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F

# Then restart the servers
```

### Dependencies Issues
If you encounter dependency conflicts:

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Database Issues
If the SQLite database has issues:

1. Stop all servers
2. Delete `backend/database.sqlite`
3. Restart the backend server (database will be recreated)

## Contributing

1. Make sure both frontend and backend are running
2. Test your changes thoroughly
3. Ensure no console errors in browser dev tools
4. Verify API endpoints work with tools like Postman

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Radix UI
- React Router
- React Hook Form
- Lucide Icons

### Backend
- Node.js
- Express.js
- SQLite3
- JWT (jsonwebtoken)
- bcryptjs
- CORS

### Development Tools
- ESLint
- Prettier
- Concurrently
- Nodemon
