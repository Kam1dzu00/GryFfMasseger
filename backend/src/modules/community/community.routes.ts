import express from 'express';
import * as communityController from './community.controller';
import * as discussionController from './discussion.controller';
import { authenticateToken } from '../auth/auth.middleware';

const router = express.Router();

router.post('/', authenticateToken, communityController.createCommunity);
router.get('/', authenticateToken, communityController.getCommunities);
router.get('/:id', authenticateToken, communityController.getCommunity);
router.post('/:id/join', authenticateToken, communityController.toggleMembership);
router.post('/:id/wall', authenticateToken, communityController.createCommunityPost);

// Discussions
router.get('/:communityId/discussions', authenticateToken, discussionController.getDiscussions);
router.post('/:communityId/discussions', authenticateToken, discussionController.createDiscussion);
router.get('/discussions/:id', authenticateToken, discussionController.getDiscussionDetails);
router.post('/discussions/:id/comments', authenticateToken, discussionController.addComment);

export default router;
