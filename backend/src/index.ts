import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { syncDatabase } from './models';

// Import modules
import authRoutes from './modules/auth/auth.routes';
import chatRoutes from './modules/chat/chat.routes';
import mediaRoutes from './modules/media/media.routes';
import communityRoutes from './modules/community/community.routes';
import feedRoutes from './modules/feed/feed.routes';
import { Message, Chat } from './models';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Initialize Database
syncDatabase();

// Setup Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all for dev
    methods: ['GET', 'POST'],
  },
});

app.set('io', io); // Set io instance to app for access in controllers

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // User connects with their own ID as a room for private signaling
  socket.on('register_user', (userId) => {
      socket.join(userId.toString());
      console.log(`User ${userId} registered for signaling`);
  });

  socket.on('send_message', async (data) => {
    // data: { roomId, message, sender }
    console.log('Message received:', data);
    
    try {
        // Save message to database
        const savedMessage = await Message.create({
            chatId: data.roomId,
            senderId: data.sender,
            content: data.message,
            type: 'text'
        });

        // Broadcast to room including sender (for confirmation)
        io.to(data.roomId).emit('receive_message', {
            id: savedMessage.id,
            content: savedMessage.content,
            senderId: savedMessage.senderId,
            chatId: savedMessage.chatId,
            createdAt: savedMessage.createdAt
        });

    } catch (error) {
        console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // --- WebRTC Signaling ---
  socket.on('call_user', (data) => {
    // data: { userToCall, signalData, from, name }
    io.to(data.userToCall).emit('call_user', { 
        signal: data.signalData, 
        from: data.from, 
        name: data.name 
    });
  });

  socket.on('answer_call', (data) => {
    // data: { to, signal }
    io.to(data.to).emit('call_accepted', data.signal);
  });
});

// Basic health check
app.get('/', (req, res) => {
  res.send('GryFf Backend is running');
});

// Use routes
app.use('/auth', authRoutes);
app.use('/chats', chatRoutes);
app.use('/media', mediaRoutes);
app.use('/communities', communityRoutes);
app.use('/feed', feedRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
