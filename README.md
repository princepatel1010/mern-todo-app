# MERN Todo App

A full-stack Todo List application built using the MERN stack (MongoDB, Express, React, Node.js) with JWT authentication.

## Features

- **User Authentication**: Register and login using JWT
- **Todo Management**: Create, read, update, and delete todo items
- **RESTful API**: Backend API built with Express and Node.js
- **Database**: MongoDB for data storage
- **Frontend**: React with hooks and context for state management
- **Styling**: Modern UI with Tailwind CSS

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication with Passport
- Zod for validation

### Frontend

- React (with hooks and context)
- React Router
- Axios for API requests
- Tailwind CSS for styling
- React Icons

## Installation and Setup

### Prerequisites

- Node.js
- MongoDB

### Setup

1. Clone the repository

   ```
   git clone https://github.com/princepatel1010/mern-todo-app.git
   cd mern-todo-app
   ```

2. Install dependencies for both server and client

   ```
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create `.env` file in the server directory with the following variables

   ```
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/mern-todo
   JWT_SECRET=yoursecretkey
   ```

4. Run the application

   ```
   # Run server (from server directory)
   npm run dev

   # Run client (from client directory)
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get user profile (requires authentication)

### Todos

- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Project Structure

```
mern-todo-app/
├── client/                # React frontend
│   ├── public/            # Static files
│   └── src/               # React source code
│       ├── components/    # React components
│       ├── context/       # Context providers
│       ├── pages/         # Page components
│       └── ...
├── server/                # Node.js backend
│   ├── src/               # Source code
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── validations/   # Zod schemas
│   └── ...
└── ...
```
