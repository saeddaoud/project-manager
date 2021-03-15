import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a project's name"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a brief description of the project'],
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'completed'],
      default: 'active',
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
    noOfEmployees: {
      type: Number,
      default: 0,
    },
    totalNoOfTasks: {
      type: Number,
      default: 0,
    },
    totalNoOfCompletedTasks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Delete all tasks when the project they were created in is deleted
projectSchema.pre('remove', async function (next) {
  await this.model('Task').deleteMany({ project: this._id });
  next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
