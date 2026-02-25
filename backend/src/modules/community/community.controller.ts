import { Request, Response } from 'express';
import { Community, User, WallPost } from '../../models';
import { Op } from 'sequelize';

// Create a new community
export const createCommunity = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const ownerId = req.user.id;
    const { name, description, type, avatarUrl, coverUrl } = req.body;

    const community = await Community.create({
      name,
      description,
      type: type || 'public',
      avatarUrl,
      coverUrl,
      ownerId
    });

    // Add owner as member (admin)
    // For now simple membership
    // @ts-ignore
    await community.addMember(ownerId);

    res.status(201).json(community);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all communities (search/list)
export const getCommunities = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    let whereClause = {};

    if (q) {
      whereClause = {
        name: { [Op.like]: `%${q}%` }
      };
    }

    const communities = await Community.findAll({
      where: whereClause,
      limit: 20
    });

    res.json(communities);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get single community details
export const getCommunity = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const community = await Community.findByPk(id, {
      include: [
        {
          model: WallPost,
          as: 'wallPosts',
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatarUrl'] }]
        }
      ]
    });

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Check if current user is member
    // @ts-ignore
    const userId = req.user.id;
    
    // @ts-ignore
    const isMember = await community.hasMember(userId);

    // @ts-ignore
    const communityData = community.toJSON();

    res.json({ ...communityData, isMember });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Join/Leave Community
export const toggleMembership = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const id = req.params.id as string;

    const community = await Community.findByPk(id);
    if (!community) {
        return res.status(404).json({ message: 'Not found' });
    }

    // @ts-ignore
    const hasMember = await community.hasMember(userId);

    if (hasMember) {
      // @ts-ignore
      await community.removeMember(userId);
      res.json({ message: 'Left community', isMember: false });
    } else {
      // @ts-ignore
      await community.addMember(userId);
      res.json({ message: 'Joined community', isMember: true });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Create post on community wall
export const createCommunityPost = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const authorId = req.user.id;
    const id = req.params.id as string;
    const { content, mediaUrl } = req.body;

    const community = await Community.findByPk(id);
    if (!community) return res.status(404).json({ message: 'Not found' });

    // Check permissions
    if (community.type === 'public' && community.ownerId !== authorId) {
        return res.status(403).json({ message: 'Only owner can post on public page' });
    }

    const post = await WallPost.create({
      content,
      mediaUrl,
      authorId,
      communityId: parseInt(id)
    });

    const postWithAuthor = await WallPost.findByPk(post.id, {
        include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatarUrl'] }]
    });

    res.status(201).json(postWithAuthor);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
