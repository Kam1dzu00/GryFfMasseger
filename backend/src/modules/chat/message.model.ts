import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Message extends Model {
  public id!: number;
  public content!: string;
  public type!: string; // 'text', 'image', 'video', 'audio'
  public senderId!: number;
  public chatId!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('text', 'image', 'video', 'audio'),
      defaultValue: 'text',
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Message',
  }
);

export default Message;
