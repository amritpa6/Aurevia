import React from "react";
import Title from "./Title";
import CarCard from "./CarCard";
import { assets } from "../assets/assets";
import { UseAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const FeaturedSection = () => {
  const { cars, navigate } = UseAppContext();
  const featuredCars = Array.isArray(cars) ? cars.slice(0, 6) : [];

  return (
    <section className="relative bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#eaf0f7] via-[#f7f9fc] to-white"
      />
      <motion.div
        initial={{ opacity: 0, y:40 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay:0.5}}
        className="relative flex flex-col items-center px-6 py-24 md:px-16 lg:px-24 xl:px-32"
      >

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
        className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {
                featuredCars.map((car) => (
                    <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    whileInView={{ opacity: 1, scale:1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    key={car._id}>
                        <CarCard car={car} appearance="featured" />
                    </motion.div>
                ))
            }

        </motion.div>

        <motion.button 
        initial={{ opacity: 0, y:20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay:0.4 }}
        className='mt-12 flex items-center justify-center gap-2 border border-gray-800 px-6 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50' onClick = {() => {navigate("/cars"); scrollTo(0,0);}}>
            Explore all cars <img src={assets.arrow_icon} alt="" />
        </motion.button>

    </motion.div>
    </section>
  )
}

export default FeaturedSection
