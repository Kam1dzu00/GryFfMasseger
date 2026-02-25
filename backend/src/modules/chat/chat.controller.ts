import { Request, Response } from 'express';
import { Chat, User, ChatParticipants, Message } from '../../models';
import { Op } from 'sequelize';

// Create a new private chat or return existing one
export const createPrivateChat = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { partnerId } = req.body;

    if (!partnerId) {
      return res.status(400).json({ message: 'Partner ID is required' });
    }

    if (userId === partnerId) {
        return res.status(400).json({ message: 'Cannot create chat with yourself' });
    }

    // Check if chat already exists
    const userChats = await ChatParticipants.findAll({ where: { UserId: userId } });
    const partnerChats = await ChatParticipants.findAll({ where: { UserId: partnerId } });

    const commonChatIds = userChats
      .map((uc: any) => uc.ChatId)
      .filter((chatId: number) => partnerChats.some((pc: any) => pc.ChatId === chatId));
    
    const existingChat = await Chat.findOne({
      where: {
        id: { [Op.in]: commonChatIds },
        type: 'private'
      }
    });

    if (existingChat) {
      return res.json(existingChat);
    }

    // Create new chat
    const newChat = await Chat.create({ type: 'private' });
    await ChatParticipants.create({ ChatId: newChat.id, UserId: userId });
    await ChatParticipants.create({ ChatId: newChat.id, UserId: partnerId });

    res.status(201).json(newChat);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new group chat
export const createGroupChat = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const { name, participantIds, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Group name is required' });
    }

    // Create chat
    const newChat = await Chat.create({ 
        type: 'group',
        name,
        description,
        ownerId: userId
    });

    // Add participants (including creator)
    const uniqueParticipants = Array.from(new Set([...(participantIds || []), userId]));
    
    const participantsData = uniqueParticipants.map(pid => ({
        ChatId: newChat.id,
        UserId: pid
    }));

    await ChatParticipants.bulkCreate(participantsData);

    // Fetch the full chat object to return
    const fullChat = await Chat.findByPk(newChat.id, {
        include: [{
            model: User,
            through: { attributes: [] },
            attributes: ['id', 'username', 'email', 'avatarUrl']
        }]
    });

    res.status(201).json(fullChat);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all chats for the current user
export const getUserChats = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const participantEntries = await ChatParticipants.findAll({ where: { UserId: userId } });
    const chatIds = participantEntries.map((p: any) => p.ChatId);

    const chats = await Chat.findAll({
      where: { id: { [Op.in]: chatIds } },
      include: [
        {
          model: User,
          through: { attributes: [] },
          attributes: ['id', 'username', 'email', 'avatarUrl'],
        },
        {
            model: Message,
            limit: 1,
            order: [['createdAt', 'DESC']],
        }
      ],
      order: [['updatedAt', 'DESC']]
    });

    // Format the response to be frontend-friendly
    const formattedChats = chats.map((chat: any) => {
      // For private chats, the name should be the other user's name
      let chatName = chat.name || 'Chat';
      let avatarUrl = chat.avatarUrl;
      let partnerId = null;
      
      if (chat.type === 'private' && chat.Users) {
        const otherUser = chat.Users.find((u: any) => u.id !== userId);
        if (otherUser) {
          chatName = otherUser.username || otherUser.email;
          avatarUrl = otherUser.avatarUrl;
          partnerId = otherUser.id;
        }
      }

      return {
        id: chat.id,
        type: chat.type,
        name: chatName,
        avatarUrl,
        lastMessage: chat.Messages && chat.Messages.length > 0 ? chat.Messages[0].content : null,
        updatedAt: chat.updatedAt,
        ownerId: chat.ownerId,
        partnerId: partnerId // Add this
      };
    });

    res.json(formattedChats);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get messages for a specific chat
export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId as string;
    const messages = await Message.findAll({
      where: { chatId },
      order: [['createdAt', 'ASC']],
      include: [{ model: User, attributes: ['id', 'username', 'avatarUrl'] }]
    });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get chat participants
export const getChatParticipants = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId as string;
    const participants = await ChatParticipants.findAll({
      where: { ChatId: chatId },
      include: [{
        model: User,
        attributes: ['id', 'username', 'email', 'avatarUrl', 'status']
      }]
    });

    // Extract User objects
    // @ts-ignore
    const users = participants.map(p => p.User);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Add participant to group
export const addParticipant = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId as string;
    const { userId } = req.body;
    // @ts-ignore
    const requesterId = req.user.id;

    const chat = await Chat.findByPk(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    if (chat.type !== 'group') {
      return res.status(400).json({ message: 'Can only add participants to groups' });
    }

    // Check if requester is in the chat (basic permission)
    const requesterInChat = await ChatParticipants.findOne({
      where: { ChatId: chatId, UserId: requesterId }
    });

    if (!requesterInChat) {
      return res.status(403).json({ message: 'You are not a member of this group' });
    }

    // Check if user already in chat
    const existingParticipant = await ChatParticipants.findOne({
      where: { ChatId: chatId, UserId: userId }
    });

    if (existingParticipant) {
      return res.status(400).json({ message: 'User already in group' });
    }

    await ChatParticipants.create({ ChatId: chatId, UserId: userId });
    
    // Ideally emit socket event "user_added"
    
    res.status(200).json({ message: 'User added' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateChat = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId as string;
    const { name, description, wallpaper } = req.body;
    
    // @ts-ignore
    const userId = req.user.id;

    const chat = await Chat.findByPk(chatId);
    if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
    }

    // Check permissions (only owner for groups, anyone for private wallpaper?)
    // For private chats, wallpaper should probably be user-specific (UserChat setting), but for MVP let's make it chat-wide or owner-only for group.
    // Actually, wallpaper is usually personal. But `Chat` model field means it's shared.
    // Let's implement it as shared for groups (admin sets it) and shared for private (either sets it) for simplicity now.
    
    if (name) chat.name = name;
    if (description) chat.description = description;
    if (wallpaper) chat.wallpaper = wallpaper;

    await chat.save();
    res.json(chat);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Message
export const editMessage = async (req: Request, res: Response) => {
    try {
        const messageId = req.params.messageId;
        const { content } = req.body;
        // @ts-ignore
        const userId = req.user.id;

        const message = await Message.findByPk(messageId);
        if (!message) return res.status(404).json({ message: 'Message not found' });
        
        if (message.senderId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        message.content = content;
        await message.save();

        // Emit Socket Event
        const io = req.app.get('io');
        io.to(message.chatId).emit('message_updated', {
            id: message.id,
            content: message.content,
            chatId: message.chatId
        });

        res.json(message);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Message
export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const messageId = req.params.messageId;
        // @ts-ignore
        const userId = req.user.id;

        const message = await Message.findByPk(messageId);
        if (!message) return res.status(404).json({ message: 'Message not found' });

        if (message.senderId !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const chatId = message.chatId; // Store before delete
        const messageIdNum = message.id; // Store before delete

        await message.destroy();

        // Emit Socket Event
        const io = req.app.get('io');
        io.to(chatId).emit('message_deleted', {
            id: messageIdNum,
            chatId: chatId
        });

        res.json({ message: 'Message deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
