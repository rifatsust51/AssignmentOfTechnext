import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../model/user';

// Constants for better maintainability
const SALT_ROUNDS = 10;
const TOKEN_EXPIRATION = '7d';
const HTTP_BAD_REQUEST = 400;
const HTTP_CREATED = 201;
const HTTP_OK = 200;

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      res.status(HTTP_BAD_REQUEST).json({ message: 'Email, password, and name are required' });
      return;
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(HTTP_BAD_REQUEST).json({ message: 'Email already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user
    const newUser = await User.create({ 
      email, 
      password: hashedPassword, 
      name 
    });

    // Generate JWT token for immediate login after signup
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: TOKEN_EXPIRATION }
    );

    // Respond with success and token
    res.status(HTTP_CREATED).json({ 
      message: 'User created successfully', 
      userId: newUser._id,
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(HTTP_BAD_REQUEST).json({ message: 'Email and password are required' });
      return;
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(HTTP_BAD_REQUEST).json({ message: 'Invalid credentials' });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(HTTP_BAD_REQUEST).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: TOKEN_EXPIRATION }
    );

    // Respond with the token and user details (excluding password)
    res.status(HTTP_OK).json({
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name 
      },
    });
  } catch (error) {
    next(error);
  }
};