import express, { Request, Response } from 'express';
import upload from '../../config/multer';
import { authenticateToken } from '../auth/auth.middleware';
import * as photosController from './photos.controller';

const router = express.Router();

router.post('/upload', authenticateToken, upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

router.get('/user/:userId/photos', authenticateToken, photosController.getUserPhotos);
router.get('/community/:communityId/photos', authenticateToken, photosController.getCommunityPhotos);

export default router;
