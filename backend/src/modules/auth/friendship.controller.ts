import { Request, Response } from 'express';
import { User, Friendship } from '../../models';
import { Op } from 'sequelize';

// Send friend request
export const sendFriendRequest = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const requesterId = req.user.id;
        const { targetId } = req.body; // Changed from userId to targetId to be clearer

        if (requesterId === targetId) {
            return res.status(400).json({ message: 'Cannot friend yourself' });
        }

        // Check if relationship exists
        const existing = await Friendship.findOne({
            where: {
                [Op.or]: [
                    { requesterId: requesterId, addresseeId: targetId },
                    { requesterId: targetId, addresseeId: requesterId }
                ]
            }
        });

        if (existing) {
            if (existing.status === 'accepted') {
                return res.status(400).json({ message: 'Already friends' });
            }
            if (existing.requesterId === requesterId) {
                return res.status(400).json({ message: 'Request already sent' });
            }
            // Accept the incoming request if exists
             existing.status = 'accepted';
             await existing.save();
             return res.status(200).json({ message: 'Friend request accepted automatically' });
        }

        await Friendship.create({
            requesterId,
            addresseeId: targetId,
            status: 'pending'
        });

        res.status(201).json({ message: 'Friend request sent' });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Accept friend request
export const acceptFriendRequest = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { requesterId } = req.body;

        const request = await Friendship.findOne({
            where: {
                requesterId,
                addresseeId: userId,
                status: 'pending'
            }
        });

        if (!request) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        request.status = 'accepted';
        await request.save();

        res.json({ message: 'Friend request accepted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Reject/Cancel request or Remove friend
export const removeFriend = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { targetId } = req.body;

        const deleted = await Friendship.destroy({
            where: {
                [Op.or]: [
                    { requesterId: userId, addresseeId: targetId },
                    { requesterId: targetId, addresseeId: userId }
                ]
            }
        });

        if (deleted) {
             res.json({ message: 'Removed' });
        } else {
             res.status(404).json({ message: 'Friendship not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get friends list
export const getFriends = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId as string;

        // Find all accepted friendships involving this user
        const friendships = await Friendship.findAll({
            where: {
                status: 'accepted',
                [Op.or]: [
                    { requesterId: userId },
                    { addresseeId: userId }
                ]
            }
        });

        // Extract the OTHER user's ID from each friendship
        const friendIds = friendships.map((f: any) => 
            f.requesterId === parseInt(userId) ? f.addresseeId : f.requesterId
        );

        if (friendIds.length === 0) {
            return res.json([]);
        }

        const friends = await User.findAll({
            where: {
                id: { [Op.in]: friendIds }
            },
            attributes: ['id', 'username', 'avatarUrl', 'status']
        });

        res.json(friends);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get friendship status between current user and target
export const getFriendshipStatus = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const currentUserId = req.user.id;
        const targetId = req.params.targetId as string;

        const friendship = await Friendship.findOne({
            where: {
                [Op.or]: [
                    { requesterId: currentUserId, addresseeId: targetId },
                    { requesterId: targetId, addresseeId: currentUserId }
                ]
            }
        });

        if (!friendship) {
            return res.json({ status: 'none' });
        }

        if (friendship.status === 'accepted') {
            return res.json({ status: 'friends' });
        }

        if (friendship.requesterId === currentUserId) {
            return res.json({ status: 'sent' });
        } else {
            return res.json({ status: 'received' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
