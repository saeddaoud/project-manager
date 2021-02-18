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
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
