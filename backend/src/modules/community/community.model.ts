import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Community extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public type!: string; // 'public', 'group', 'event'
  public avatarUrl!: string;
  public coverUrl!: string;
  public ownerId!: number;
}

Community.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('public', 'group', 'event'),
      defaultValue: 'public',
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coverUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Community',
  }
);

export default Community;
