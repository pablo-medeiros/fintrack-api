import jwt from 'jsonwebtoken';
import { AppError } from '../middlewares/error.middleware';
import { $Enums } from '@prisma/client';
const secretKey = process.env.JWT_SECRET || 'your_secret_key';
const accessTokenExpiry = '15m'; 
const refreshTokenExpiry = '7d'; 
const refreshTokenSecretKey = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key';

export default class TokenService {
  generateToken(userId: string, role: $Enums.Role): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign({ userId, role }, secretKey, { expiresIn: accessTokenExpiry });
    const refreshToken = jwt.sign({ userId }, refreshTokenSecretKey, { expiresIn: refreshTokenExpiry });
    return { accessToken, refreshToken };
  }

  verifyToken(token: string): { userId: string; role: $Enums.Role } {
    try {
      const decoded = jwt.verify(token, secretKey) as { userId: string; role: $Enums.Role };
      return decoded;
    } catch (error) {
      throw new AppError('Invalid token', 401);
    }
  }

  verifyRefreshToken(token: string): { userId: string } {
    try {
      const decoded = jwt.verify(token, refreshTokenSecretKey) as { userId: string };
      return decoded;
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }
}