# University App

A full-stack web application for searching universities and managing favorites, built with React (Frontend) and Node.js/Express (Backend).

## 🚀 Quick Start

### Run the Application

```bash
# Clone and navigate to the project
cd university-app

# Start the application
docker-compose up --build

# Access the app
open http://localhost:3000
```

### Stop the Application

```bash
docker-compose down
```

## Project Structure

```
├── Frontend/          # React + TypeScript + Vite
├── Backend/           # Node.js + Express + SQLite
└── docker-compose.yml # Docker configuration
```

## Architecture

- **Frontend**: React app with Vite dev server (Port 3000)
- **Backend**: Express API server (Internal port 5001)
- **Database**: SQLite with university data
- **Proxy**: Frontend proxies `/api/*` requests to backend

## Features

- Search universities by country and name
- Add/remove favorites
- Responsive design
- Full test coverage

## API Endpoints

- `GET /api/countries` - Get all countries
- `GET /api/universities` - Search universities
- `POST /api/favourites/:id` - Add to favorites
- `DELETE /api/favourites/:id` - Remove from favorites
- `GET /api/favourites` - Get favorites list
