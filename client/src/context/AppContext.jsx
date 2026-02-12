import { createContext, useContext } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext({});

const getInitialToken = () => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken || savedToken === 'null' || savedToken === 'undefined') {
        return null;
    }
    return savedToken;
};

export const AppProvider = ({children}) => {

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY || '$'; 
    const [token, setToken] = useState(getInitialToken);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [cars, setCars] = useState([]);

    const clearAuthState = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        delete axios.defaults.headers.common['Authorization'];
    };

    // Function to check if the user is logged in
    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/data');
            if (data?.success) {
                setUser(data.data);
                setIsOwner(data.data.role === 'owner');
            }else{
                navigate('/');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                clearAuthState();
                return;
            }
            toast.error(error.response?.data?.message || error.message);
        }
    }

    // Function to fetch all cars from the server
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars');
            (data?.success)?setCars(data.cars) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to log out the user
    const logout = () => {
        clearAuthState();
        toast.success('Logged out successfully');
    }

    // Use effect to fetch user data when token is available
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Token is added in all requests
            fetchUser();
            return;
        }
        delete axios.defaults.headers.common['Authorization'];
    }, [token]);

    // Fetch cars once on app load
    useEffect(() => {
        fetchCars();
    }, []);




    const value = {
        navigate, currency, axios, 
        user, setUser, 
        token, setToken, 
        isOwner, setIsOwner, 
        showLogin, setShowLogin,
        pickupDate, setPickupDate, 
        returnDate, setReturnDate,
        cars, setCars,
        fetchUser,
        fetchCars,
        logout

    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const UseAppContext = () => {
    return useContext(AppContext);
}
