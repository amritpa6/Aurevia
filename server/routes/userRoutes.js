import express from 'express';
import { registerUser, loginUser, getUserData, getCars } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

// User Registration Route
userRouter.post('/register', registerUser);
// User Login Route
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserData);
userRouter.get('/cars', getCars);


export default userRouter;
