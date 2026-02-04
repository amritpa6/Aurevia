import User from '../models/User.js';
import Car from '../models/Car.js';
import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Booking from '../models/Booking.js';
// API to change User Role to Owner
export const changeRoleToOwner = async (req, res) => {
    try {
        const {_id} = req.user;
        const user = await User.findByIdAndUpdate(_id, { role: 'owner' });
        res.json({ success: true, message: 'Now you can list cars' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to list car
export const listCar = async (req, res) => {
    try {
        const {_id} = req.user;
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Car image is required' });
        }

        if (!req.body.carData) {
            return res.status(400).json({ success: false, message: 'carData is required' });
        }

        let car;
        try {
            car = JSON.parse(req.body.carData);
        } catch {
            return res.status(400).json({ success: false, message: 'Invalid carData JSON' });
        }

        const imageFile = req.file;

        // Upload image to ImageKit
        const response = await imageKit.files.upload({
            file: fs.createReadStream(imageFile.path),
            fileName: imageFile.originalname,
            folder: '/cars'
        });

        const image = response.url;
        await Car.create({ ...car, image, owner: _id });
        res.status(201).json({ success: true, message: 'Car listed successfully' });

    } catch (error) {
        console.log(error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to list owner car
export const listOwnerCars = async (req, res) => {
    try {
        const {_id} = req.user;
        const cars = await Car.find({ owner: _id, isDeleted: { $ne: true } });
        res.status(200).json({ success: true, data: cars });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to toggle car availability
export const toggleCarAvailability = async (req, res) => {
    try {
        const {_id} = req.user;
        const { carId } = req.body;
        const car = await Car.findOne({ _id: carId, owner: _id, isDeleted: { $ne: true } });

        // Checking if the car belongs to the owner
        if (!car) {
            return  res.status(404).json({ success: false, message: 'Car not found' });
        }

        // Toggle availability
        car.isAvailable = !car.isAvailable;
        await car.save();

        res.status(200).json({ success: true, message: "Availability updated successfully" });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to delete a car
export const deleteCar = async (req, res) => {
    try {
        const {_id} = req.user;
        const { carId } = req.body;
        const car = await Car.findOne({ _id: carId, owner: _id, isDeleted: { $ne: true } });

        // Checking if the car belongs to the owner
        if (!car) {
            return  res.status(404).json({ success: false, message: 'Car not found' });
        }

        car.isDeleted = true;
        car.isAvailable = false;

        await car.save();
        res.status(200).json({ success: true, message: "Car Removed successfully" });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}
// API to get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const {_id, role} = req.user;
        if(role !== 'owner') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        const totalCars = await Car.find({ owner: _id, isDeleted: { $ne: true } });

        const bookingData = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 }); // Placeholder for future booking data implementation

        const pendingBookings = await Booking.find({ owner: _id, status: 'pending' });
        const completedBookings = await Booking.find({ owner: _id, status: 'confirmed' });
        
        const monthlyRevenue = completedBookings.reduce((total, booking) => total + booking.price, 0);

        const dashboardData = {
            totalCars: totalCars.length,
            totalBookings: bookingData.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookingData.slice(0, 3), // Get the 3 most recent bookings
            monthlyRevenue,
        };
        res.status(200).json({ success: true, data: dashboardData });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to update user image
export const updateUserImage = async (req, res) => {
    try {
        const {_id} = req.user;
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image file is required' });
        }
        
        const imageFile = req.file;

        // Upload image to ImageKit
        const response = await imageKit.files.upload({
            file: fs.createReadStream(imageFile.path),
            fileName: imageFile.originalname,
            folder: '/users'
        });

        const image = response.url;
        await User.findByIdAndUpdate(_id, { image });
        res.status(200).json({ success: true, message: 'User image updated successfully' });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}
