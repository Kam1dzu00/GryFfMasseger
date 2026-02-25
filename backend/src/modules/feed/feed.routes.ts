import express from 'express';
import * as feedController from './feed.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = express.Router();

router.get('/', authenticateToken, feedController.getNewsFeed);

export default router;
