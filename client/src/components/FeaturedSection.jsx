import React from 'react'
import Title from './Title'
import CarCard from './CarCard'
import { assets } from '../assets/assets';
import { UseAppContext } from '../context/AppContext';
import {motion} from 'motion/react';

const FeaturedSection = () => {

    const { cars, navigate } = UseAppContext();
    

  return (
    <motion.div
        initial={{ opacity: 0, y:40 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay:0.5}}
    className='flex flex-col items-center py-24 px-6 md: px-16 1g:px-24 x1:px-32'>

        <motion.div
        initial={{ opacity: 0, y:20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1,ease: "easeOut" }}
        >
            <Title title="Featured Cars" subtitle="Explore our premium vehicles available for your next adventure" align="center" />
        </motion.div>

        <motion.div 
        initial={{ opacity: 0, y:100 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay:0.5 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
            {
                cars.slice(0,6).map((car) => (
                    <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    whileInView={{ opacity: 1, scale:1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    key={car._id}>
                        <CarCard car={car} />
                    </motion.div>
                ))
            }

        </motion.div>

        <motion.button 
        initial={{ opacity: 0, y:20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay:0.4 }}
        className='flex items-center justify-center gap-2 px-6 py-2 border' onClick = {() => {navigate("/cars"); scrollTo(0,0);}}>
            Explore all cars <img src={assets.arrow_icon} alt="" />
        </motion.button>

    </motion.div>
  )
}

export default FeaturedSection
