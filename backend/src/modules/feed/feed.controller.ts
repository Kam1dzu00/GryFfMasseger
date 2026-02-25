import { Request, Response } from 'express';
import { User, Friendship, Community, WallPost, CommunityMembers } from '../../models';
import { Op } from 'sequelize';

// Get aggregated news feed
export const getNewsFeed = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const limit = 20;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * limit;

    // 1. Get Friends IDs
    const friendships = await Friendship.findAll({
      where: {
        status: 'accepted',
        [Op.or]: [
          { requesterId: userId },
          { addresseeId: userId }
        ]
      }
    });

    const friendIds = friendships.map((f: any) => 
      f.requesterId === userId ? f.addresseeId : f.requesterId
    );

    // 2. Get Communities
    const userWithCommunities = await User.findByPk(userId, {
        include: [{
            model: Community,
            as: 'communities',
            attributes: ['id']
        }]
    });

    // @ts-ignore
    const communityIds = userWithCommunities?.communities?.map((c: any) => c.id) || [];

    // 3. Fetch Posts
    const posts = await WallPost.findAll({
      where: {
        [Op.or]: [
            // Posts by friends on their own walls (userId = friendId, communityId = null)
            { 
                userId: { [Op.in]: friendIds },
                communityId: null 
            },
            // Posts in communities user is member of
            {
                communityId: { [Op.in]: communityIds }
            }
        ]
      },
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: (page - 1) * limit,
      include: [
        { 
            model: User, 
            as: 'author', 
            attributes: ['id', 'username', 'avatarUrl'] 
        },
        {
            model: Community,
            as: 'community',
            attributes: ['id', 'name', 'avatarUrl']
        },
        {
            model: User,
            as: 'owner', // Wall owner (if user wall)
            attributes: ['id', 'username']
        }
      ]
    });

    res.json(posts);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
