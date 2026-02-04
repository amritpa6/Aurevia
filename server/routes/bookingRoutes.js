import express from 'express';
import {
    checkAvailabilityOfCar,
    createBooking,
    getUserBookings,
    getOwnerBookings,
    updateBookingStatus
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityOfCar); 
bookingRouter.post('/create',protect, createBooking);
bookingRouter.get('/user',protect, getUserBookings);
bookingRouter.get('/owner',protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, updateBookingStatus);

export default bookingRouter;
