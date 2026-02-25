# GryFf - Hybrid Social Platform

## Overview
GryFf is a modern, hybrid social platform combining features of Telegram (messaging) and VK (social networking). Built with a React frontend and Express/Node.js backend.

## Features
- **Authentication**: Secure Login/Register with JWT.
- **Real-time Chat**: Private and Group chats with Socket.io.
- **Social Features**: Profile pages, Friend system, Communities, News Feed.
- **Media**: Photo gallery, Wall posts.
- **Calls**: WebRTC Audio/Video calls.
- **Customization**: Light/Dark theme, Chat wallpapers.

## Prerequisites
- Node.js (v16+)
- npm

## Getting Started

### 1. Backend
The backend handles API requests, database (SQLite), and real-time signaling.

```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:3000`.

### 2. Frontend
The frontend is a Vite + React application.

```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## Testing
To run frontend unit tests:
```bash
cd frontend
npm test
```

## Tech Stack
- **Frontend**: React, TypeScript, Styled Components, Vite, Socket.io-client, Simple-peer.
- **Backend**: Express, TypeScript, Sequelize, SQLite, Socket.io.

## License
© 2026 GryFf Inc.
