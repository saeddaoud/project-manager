import mongoose from 'mongoose';
const { Schema } = mongoose;

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

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
