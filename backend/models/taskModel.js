import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    employee: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
    name: {
      type: String,
      required: [true, "Task's name is required"],
      // unique: true,
    },
    description: {
      type: String,
      required: [true, "Task's description is required"],
    },
    status: {
      type: String,
      required: [true, "Task's status is required"],
      enum: ['not started', 'in progress', 'paused', 'aborted', 'completed'],
      default: 'not started',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
