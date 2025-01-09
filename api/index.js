import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from the .env file

import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.routes.js';

// Debugging: Log the environment variable to verify it's loaded correctly
console.log("MongoDB URI from env:", process.env.MONGO);

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected DB successfully');
  })
  .catch((error) => {
    console.log('Error connecting to DB:', error);
  });

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

app.use('/api/user', userRouter); // Routes for user
app.use('/api/auth', authRouter); // Routes for auth

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
