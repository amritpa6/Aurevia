import express from 'express';
import { changeRoleToOwner, listCar, toggleCarAvailability, deleteCar, listOwnerCars, getDashboardData, updateUserImage  } from '../controllers/ownerController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

// Owner Registration Route
ownerRouter.post('/change-role', protect, changeRoleToOwner);
ownerRouter.post('/add-car', upload.single('image'), protect, listCar);
ownerRouter.get('/cars', protect, listOwnerCars);
ownerRouter.post('/toggle-car', protect, toggleCarAvailability);
ownerRouter.post('/delete-car', protect, deleteCar);
ownerRouter.get('/dashboard', protect, getDashboardData);
ownerRouter.post('/update-image', upload.single('image'), protect, updateUserImage);

export default ownerRouter;
