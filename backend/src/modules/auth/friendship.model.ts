import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Friendship extends Model {
  public id!: number;
  public requesterId!: number;
  public addresseeId!: number;
  public status!: string; // 'pending', 'accepted', 'rejected'
}

Friendship.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    addresseeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Friendship',
  }
);

export default Friendship;
