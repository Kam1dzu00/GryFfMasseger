import { Request, Response } from 'express';
import { Discussion, DiscussionComment, User } from '../../models';

export const getDiscussions = async (req: Request, res: Response) => {
  try {
    const communityId = req.params.communityId as string;
    const discussions = await Discussion.findAll({
      where: { communityId },
      include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatarUrl'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(discussions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createDiscussion = async (req: Request, res: Response) => {
  try {
    const communityId = req.params.communityId as string;
    const { title, content } = req.body;
    // @ts-ignore
    const authorId = req.user.id;

    const discussion = await Discussion.create({
      title,
      content,
      communityId: parseInt(communityId),
      authorId
    });

    const discussionWithAuthor = await Discussion.findByPk(discussion.id, {
        include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatarUrl'] }]
    });

    res.status(201).json(discussionWithAuthor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDiscussionDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const discussion = await Discussion.findByPk(id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'avatarUrl'] },
        { 
            model: DiscussionComment, 
            as: 'comments',
            include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatarUrl'] }]
        }
      ]
    });
    res.json(discussion);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // discussionId
    const { content } = req.body;
    // @ts-ignore
    const authorId = req.user.id;

    const comment = await DiscussionComment.create({
      content,
      discussionId: parseInt(id),
      authorId
    });

    const commentWithAuthor = await DiscussionComment.findByPk(comment.id, {
        include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatarUrl'] }]
    });

    res.status(201).json(commentWithAuthor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
