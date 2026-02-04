import Booking from '../models/Booking.js';
import Car from '../models/Car.js';


// Function to check availability of a car for given dates
export const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find(
        {
            car, 
            pickupDate: { $lt: returnDate }, 
            returnDate: { $gt: pickupDate }     
        }
    );
    return bookings.length === 0;
}

// API to check availability of a car for a given date and location
export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;

        // fetch all available cars in the location
        const cars = await Car.find({ location, isAvailable: true, isDeleted: { $ne: true } });

        // check car availability for the given dates
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
            return {...car._doc, isAvailable: isAvailable };
        });

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true);

        res.status(200).json({ success: true, data: availableCars });

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
        
    }
}

// API to create a booking
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { car, pickupDate, returnDate } = req.body;

        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        if(!isAvailable) {
            return res.status(400).json({ success: false, message: 'Car is not available for the selected dates' });
        }
        
        const carDetails = await Car.findOne({ _id: car, isAvailable: true, isDeleted: { $ne: true } });
        if(!carDetails) {
            return res.status(404).json({ success: false, message: 'Car not available' });
        }
        // Calculate total price as per days
        const days = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
        const price = days * carDetails.pricePerDay;
        
        const booking = await Booking.create({
            car,
            user: _id,
            owner: carDetails.owner,
            pickupDate,
            returnDate,
            price,
        });
        res.status(201).json({ success: true, message: 'Booking created successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
        
    }
}

// API to get user bookings
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({user: _id}).populate('car').populate('owner', '-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
        
    }
}

// API to get owner bookings
export const getOwnerBookings = async (req, res) => {
    try {
        if(req.user.role !== 'owner') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('car').populate('user', '-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to update booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if(booking.owner.toString() != _id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        booking.status = status;
        await booking.save();
        res.status(200).json({ success: true, message: 'Booking status updated successfully' });

        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}
