import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB is connected'.yellow.bold);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
