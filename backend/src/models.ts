import sequelize from './config/database';
import User from './modules/auth/user.model';
import Chat from './modules/chat/chat.model';
import Message from './modules/chat/message.model';
import WallPost from './modules/auth/wall_post.model';
import Friendship from './modules/auth/friendship.model';
import Community from './modules/community/community.model';
import { Discussion, DiscussionComment } from './modules/community/discussion.model';

// Define associations
User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId' });

Chat.hasMany(Message, { foreignKey: 'chatId' });
Message.belongsTo(Chat, { foreignKey: 'chatId' });

// User Profile Wall
User.hasMany(WallPost, { foreignKey: 'userId', as: 'wallPosts' });
WallPost.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
WallPost.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Community Wall
Community.hasMany(WallPost, { foreignKey: 'communityId', as: 'wallPosts' });
WallPost.belongsTo(Community, { foreignKey: 'communityId', as: 'community' });

// Community Membership
Community.belongsToMany(User, { through: 'CommunityMembers', as: 'members' });
User.belongsToMany(Community, { through: 'CommunityMembers', as: 'communities' });

// Discussions
Community.hasMany(Discussion, { foreignKey: 'communityId' });
Discussion.belongsTo(Community, { foreignKey: 'communityId' });

Discussion.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Discussion, { foreignKey: 'authorId' });

Discussion.hasMany(DiscussionComment, { foreignKey: 'discussionId', as: 'comments' });
DiscussionComment.belongsTo(Discussion, { foreignKey: 'discussionId' });

DiscussionComment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(DiscussionComment, { foreignKey: 'authorId' });

// Friends
User.belongsToMany(User, { as: 'Friends', through: Friendship, foreignKey: 'requesterId', otherKey: 'addresseeId' });
User.belongsToMany(User, { as: 'AddedBy', through: Friendship, foreignKey: 'addresseeId', otherKey: 'requesterId' });

// Many-to-Many for Chat Participants
User.belongsToMany(Chat, { through: 'ChatParticipants' });
Chat.belongsToMany(User, { through: 'ChatParticipants' });

const ChatParticipants = sequelize.models.ChatParticipants;
const CommunityMembers = sequelize.models.CommunityMembers;

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use alter to update tables without dropping
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

export { User, Chat, Message, ChatParticipants, WallPost, Friendship, Community, CommunityMembers, Discussion, DiscussionComment, syncDatabase };

