import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.model';

const SECRET_KEY = process.env.JWT_SECRET || 'secret_key_for_dev';

export const register = async (email: string, password: string, username?: string) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = await User.create({ 
      email, 
      password, 
      username: username || email.split('@')[0] 
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return { token, user };
  } catch (error) {
    throw error;
  }
};
