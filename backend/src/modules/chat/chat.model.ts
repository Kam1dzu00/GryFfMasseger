import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Chat extends Model {
  public id!: number;
  public type!: string; // 'private', 'group', 'channel'
  public name!: string; // For group chats
  public avatarUrl!: string; // For group chats
  public ownerId!: number; // For group chats
  public description!: string; // For group chats
  public wallpaper!: string; // Custom wallpaper
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('private', 'group', 'channel'),
      defaultValue: 'private',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    wallpaper: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Chat',
  }
);

export default Chat;
