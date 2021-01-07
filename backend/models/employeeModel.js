import mongoose from 'mongoose';
const { Schema } = mongoose;

import bcrypt from 'bcryptjs';

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter a valid email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please Enter a password between 6 and 12 characters'],
    },
    role: {
      type: String,
      required: true,
      enum: ['employee', 'supervisor', 'manager'],
      default: 'employee',
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password on save
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.getSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
