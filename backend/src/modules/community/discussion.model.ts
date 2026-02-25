import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Discussion extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public communityId!: number;
  public authorId!: number;
}

Discussion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    communityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Discussion',
  }
);

class DiscussionComment extends Model {
  public id!: number;
  public content!: string;
  public discussionId!: number;
  public authorId!: number;
}

DiscussionComment.init(
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
    discussionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'DiscussionComment',
  }
);

export { Discussion, DiscussionComment };
