# Collabistan

This is the backend of collabistan.

## Project Structure

```
.gitignore
server/
	.env
	app.js
	controllers/
		user.controller.js
	db/
		db.js
	middleware/
		auth.js
	models/
		user.model.js
	package.json
	routes/
		user.route.js
	server.js
	services/
		redis.service.js
		user.services.js
```

## Installation

1. Clone the repository.
2. Navigate to the server directory.
3. Install the dependencies using npm:

```sh
npm install
```

## Environment Variables

Create a .env file in the server directory and add the following environment variables:

```
PORT=3000
MONGO_URI=<your_mongo_uri>
JWT_SECRET_KEY=<your_jwt_secret_key>
REDIS_HOST=<your_redis_host>
REDIS_PORT=<your_redis_port>
REDIS_PASSWORD=<your_redis_password>
```

## Running the Server

To start the server in development mode, run:

```sh
npm run dev
```

The server will start on the port specified in the .env file (default is 3000).

## API Endpoints

### User Routes

- **POST /api/user/signup**

  Registers a new user.

  Request body:

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST /api/user/signin**

  Logs in an existing user.

  Request body:

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **GET /api/user/profile**

  Retrieves the profile of the authenticated user.

  Requires authentication.

- **GET /api/user/logout**

  Logs out the authenticated user.

  Requires authentication.

## Middleware

- **Authentication Middleware** (server/middleware/auth.js)

  Ensures that the user is authenticated before accessing certain routes.

## Services

- **User Services** (server/services/user.services.js)

  Provides functions to create and manage users.

- **Redis Service** (server/services/redis.service.js)

  Configures and connects to the Redis server.

## Models

- **User Model** (server/models/user.model.js)

  Defines the user schema and provides methods for hashing passwords.

## Controllers

- **User Controller** (server/controllers/user.controller.js)

  Handles user-related requests such as signup, login, and profile retrieval.

## Database

- **MongoDB Connection** (server/db/db.js)

  Connects to the MongoDB database using Mongoose.

## Logging

- **Morgan** is used for logging HTTP requests.
