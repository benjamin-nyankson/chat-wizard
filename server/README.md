
# AI Chat Node Server

This is the backend server for the AI Chat application using Express.js and MongoDB.

## Setup

1. Install dependencies:
```
npm install
```

2. Create a `.env` file based on `.env.example`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-chat
JWT_SECRET=your_secure_random_string_here
```

3. Start the server:
```
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user data

### Chats
- `GET /api/chat` - Get all chats for the authenticated user
- `POST /api/chat` - Create a new chat or send a message to existing chat
- `DELETE /api/chat/:chatId` - Delete a chat

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/chats` - Get all chats (admin only)

## MongoDB Setup

1. Make sure MongoDB is installed and running on your system.
2. The server will create the necessary collections automatically.

## Initial Admin User

To create an admin user, register a normal user first, then manually update in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```
