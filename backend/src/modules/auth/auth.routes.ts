import express from 'express';
import * as authController from './auth.controller';
import * as userController from './user.controller';
import * as friendshipController from './friendship.controller';
import { authenticateToken } from './auth.middleware';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users/search', authenticateToken, userController.searchUsers);
router.get('/users/:userId', authenticateToken, userController.getProfile);
router.put('/users/profile', authenticateToken, userController.updateProfile);
router.post('/users/:userId/wall', authenticateToken, userController.createWallPost);
router.get('/me', authenticateToken, (req, res) => {
    // @ts-ignore
    res.json(req.user);
});

// Friends
router.post('/friends/request', authenticateToken, friendshipController.sendFriendRequest);
router.post('/friends/accept', authenticateToken, friendshipController.acceptFriendRequest);
router.post('/friends/remove', authenticateToken, friendshipController.removeFriend);
router.get('/users/:userId/friends', authenticateToken, friendshipController.getFriends);
router.get('/friends/status/:targetId', authenticateToken, friendshipController.getFriendshipStatus);

export default router;

