import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class WallPost extends Model {
  public id!: number;
  public content!: string;
  public mediaUrl!: string; // Optional for images/videos
  public userId!: number | null; // The wall owner (User)
  public communityId!: number | null; // The wall owner (Community)
  public authorId!: number; // Who wrote the post
  public likes!: number;
}

WallPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    communityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'WallPost',
  }
);

export default WallPost;
