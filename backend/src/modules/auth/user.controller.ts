import { Request, Response } from 'express';
import { User, WallPost } from '../../models';
import { Op } from 'sequelize';

export const searchUsers = async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        // @ts-ignore
        const currentUserId = req.user.id;

        if (!q) {
            return res.json([]);
        }

        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { username: { [Op.like]: `%${q}%` } },
                    { email: { [Op.like]: `%${q}%` } }
                ],
                id: { [Op.ne]: currentUserId } // Exclude self
            },
            attributes: ['id', 'username', 'email', 'avatarUrl'],
            limit: 10
        });

        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId as string;
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] },
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

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { username, status, city, birthDate, about, avatarUrl, coverUrl } = req.body;

        await User.update(
            { username, status, city, birthDate, about, avatarUrl, coverUrl },
            { where: { id: userId } }
        );

        const updatedUser = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
        res.json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createWallPost = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const authorId = req.user.id;
        const userId = req.params.userId as string; // Profile owner
        const { content, mediaUrl } = req.body;

        const post = await WallPost.create({
            content,
            mediaUrl,
            authorId,
            userId: parseInt(userId)
        });

        const postWithAuthor = await WallPost.findByPk(post.id, {
            include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatarUrl'] }]
        });

        res.status(201).json(postWithAuthor);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
