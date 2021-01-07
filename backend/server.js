// import libraries
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

// import files
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// connect to database
connectDB();

const app = express();

// Mount routes
app.use('/api/v1/auth', authRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
