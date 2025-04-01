
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
  STUDENT = 'student',
  COLLEGE = 'college',
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Only create the model if it doesn't already exist
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
