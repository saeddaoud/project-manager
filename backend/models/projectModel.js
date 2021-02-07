import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a project's name"],
    },
    description: {
      type: String,
      required: [true, 'Please provide a brief description of the project'],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
