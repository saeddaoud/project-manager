import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    name: {
      type: String,
      required: [true, "Task's name is required"],
    },
    description: {
      type: String,
      required: [true, "Task's description is required"],
    },
    status: {
      type: String,
      required: [true, "Task's status is required"],
      enum: ['NA', 'In progress', 'Aborted', 'Completed'],
      default: 'NA',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
