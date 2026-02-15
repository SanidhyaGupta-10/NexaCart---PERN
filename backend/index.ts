import express from 'express';
import { ENV } from './src/config/env.js';
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors';

const app = express();

app.use(cors({
    origin: ENV.FRONTEND_URL, // Allow all origins
})); // Enable CORS for all routes
app.use(clerkMiddleware()); // Add Clerk middleware to handle authentication and user management
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(ENV.PORT, () => {
  console.log(`http://localhost:${ENV.PORT}`);
});