import { Sequelize } from 'sequelize';
import path from 'path';

// Use SQLite for development for simplicity (as requested to make it work immediately)
// But structure it so it can be switched to Postgres easily later
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false, // Set to console.log to see SQL queries
});

export default sequelize;
