// import libraries
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

// import files
import connectDB from './config/db.js';

dotenv.config();

// connect to database
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
