import { Request, Response } from 'express';
import { User, WallPost } from '../../models';
import { Op } from 'sequelize';

export const getUserPhotos = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const posts = await WallPost.findAll({
      where: {
        userId: userId,
        mediaUrl: { [Op.ne]: null }
      },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'mediaUrl', 'createdAt']
    });
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommunityPhotos = async (req: Request, res: Response) => {
  try {
    const { communityId } = req.params;
    const posts = await WallPost.findAll({
      where: {
        communityId: communityId,
        mediaUrl: { [Op.ne]: null }
      },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'mediaUrl', 'createdAt']
    });
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
