// import libraries
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import colors from 'colors';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import mongoSanitizer from 'express-mongo-sanitize';
// import fileupload from 'express-fileupload';

// import files
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
// import fileUpload from 'express-fileupload';

dotenv.config();

// connect to database
connectDB();

const app = express();

// Express middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(mongoSanitizer());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// app.use(fileUpload());

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Make the upload folder accessible
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Read static file for deployment
// const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
