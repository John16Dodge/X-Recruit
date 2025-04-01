
import User, { UserRole, IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../lib/db';

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || 'your-secret-key';

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Partial<IUser>;
  token?: string;
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
  role: UserRole
): Promise<AuthResponse> {
  try {
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        message: 'User with this email already exists',
      };
    }
    
    // Create new user
    const user = new User({
      email,
      password,
      name,
      role,
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return {
      success: true,
      message: 'User registered successfully',
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Error registering user',
    };
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    await connectToDatabase();
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return {
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Error logging in',
    };
  }
}
