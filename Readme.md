# Collabistan

A complete real-time chat application built using the MERN stack, enhanced with AI support from Google Gemini. Collabistan leverages Redis for high-performance caching and uses WebSocket connections for smooth, real-time communication.

## Features

- **Real-Time Messaging:** Instant communication with seamless synchronization across devices.
- **AI Assistance:** AI-powered suggestions and enhancements via Google Gemini integration.
- **Group Chats:** Create and manage group conversations with ease.
- **Redis Integration:** Optimized performance with caching and session management.
- **WebSocket Communication:** Smooth real-time interactions using Socket.IO.
- **User Authentication:** Secure login and signup with JWT-based authentication.
- **Responsive UI:** Fully functional and user-friendly interface designed for all devices.

---

## Tech Stack

### Frontend

- **React.js**
- **Tailwind CSS**

### Backend

- **Node.js** with **Express.js**
- **Socket.IO** for WebSocket connections
- **Google Gemini API** for AI functionality
- **Redis** for caching and session management

### Database

- **MongoDB**

---

## Prerequisites

- **Node.js** (v16 or above)
- **MongoDB** (Atlas or local instance)
- **Redis** (installed locally or use a cloud instance)
- **Google Gemini API Key** (Sign up for access)
- **Socket.IO** installed for real-time communication

---

## Installation

### Clone the Repository

```bash
$ git clone https://github.com/yourusername/collabistan.git
$ cd collabistan
```

### Backend Setup

1. Navigate to the `backend` folder:

   ```bash
   $ cd backend
   ```

2. Install dependencies:

   ```bash
   $ npm install
   ```

3. Create a `.env` file:

   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   $ npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` folder:

   ```bash
   $ cd frontend
   ```

2. Install dependencies:

   ```bash
   $ npm install
   ```

3. Start the frontend server:
   ```bash
   $ npm run dev
   ```

---

## Usage

1. Visit the frontend at `http://localhost:3000`.
2. Sign up or log in to start chatting.
3. Use the AI assistant for suggestions by typing `@ai` followed by your query.

---

## Redis Integration

- **Session Caching:** Enhances performance by storing session data.
- **Message Caching:** Reduces database load by caching frequently accessed data.

---

## Acknowledgments

- **Google Gemini** for AI integration
- **Socket.IO** for real-time communication
- **Redis** for performance optimization
- **MongoDB** for scalable database solutions
