import express from 'express';
import * as chatController from './chat.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = express.Router();

router.post('/private', authenticateToken, chatController.createPrivateChat);
router.post('/group', authenticateToken, chatController.createGroupChat);
router.get('/', authenticateToken, chatController.getUserChats);
router.put('/:chatId', authenticateToken, chatController.updateChat);
router.get('/:chatId/messages', authenticateToken, chatController.getChatMessages);
router.get('/:chatId/participants', authenticateToken, chatController.getChatParticipants);
router.post('/:chatId/participants', authenticateToken, chatController.addParticipant);

// Message operations
router.put('/messages/:messageId', authenticateToken, chatController.editMessage);
router.delete('/messages/:messageId', authenticateToken, chatController.deleteMessage);

export default router;
