import React from 'react'
import { cityList } from '../assets/assets'
import mustang from "../assets/grey_shelby.png";
import { assets } from '../assets/assets';
import { UseAppContext } from '../context/AppContext';
import {motion} from 'motion/react';

const Hero = () => {
    const [selectedCity, setSelectedCity] = React.useState("");

    const {pickupDate, returnDate, setPickupDate, setReturnDate, navigate} = UseAppContext();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate("/cars?pickupLocation=" + selectedCity + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate);
    }

  return (
    <motion.div 
     initial={{opacity: 0 }}
     animate={{opacity: 1 }}
     transition={{ duration: 0.8 }}
     className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
      
        <motion.h1 
        initial={{ y:50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='text-4xl font-semibold md:text-4xl lg:text-5xl'>Premium Cars for Rent</motion.h1>

        <motion.form
        initial={{ scale: 0.95, y:50, opacity: 0 }}
        animate={{ scale: 1, y:0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
         onSubmit={handleSearch} className='flex flex-col  md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>

            <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8 md:gap-16'>
                <div className ='flex flex-col items-start gap-2'>
                    <select required  value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} >
                        <option value="">Pickup Location</option>
                        {cityList.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <p className="px-1 text-sm text-gray-500" >{selectedCity ? selectedCity : "Please select location"}</p>
                </div>

                <div className ='flex flex-col items-start gap-2'>
                    <label htmlFor="pickup-date">Pickup Date</label>
                    <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split("T")[0]} className="text-sm text-grey-500" required />
                </div>

                <div className ='flex flex-col items-start gap-2'>
                    <label htmlFor="return-date">Return Date</label>
                    <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type="date" id="return-date" min={new Date().toISOString().split("T")[0]} className="text-sm text-grey-500" required />
                </div>

            </div>

            <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap ={{ scale: 0.95 }}
            className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'>
                    <img src={assets.search_icon} alt="search" className="brightness-300" />
                    Search
            </motion.button>

        </motion.form>

        <motion.img 
        initial={{ y:100, opacity: 0 }}
        animate={{ y:0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={mustang} alt="Mustang" className="w-full max-w-3xl mx-auto" />


    </motion.div>
  )
}

export default Hero
