
import mongoose from 'mongoose';

// Initialize connection
export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }
    
    const MONGODB_URI = import.meta.env.VITE_MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}
