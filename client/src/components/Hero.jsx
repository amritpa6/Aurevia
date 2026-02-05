import React from "react";
import { cityList } from "../assets/assets";
import mustang from "../assets/grey_shelby.png";
import { assets } from "../assets/assets";
import { UseAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [selectedCity, setSelectedCity] = React.useState("");

  const { pickupDate, returnDate, setPickupDate, setReturnDate, navigate } =
    UseAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        selectedCity +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden bg-gradient-to-b from-[#c7cfdb] via-[#d4dbe4] to-[#eaf0f7] text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.58),rgba(255,255,255,0)_58%)]"
      />

      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-4xl font-semibold md:text-4xl lg:text-5xl"
      >
        Premium Cars for Rent
      </motion.h1>

      <motion.form
        initial={{ scale: 0.95, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="relative z-10 flex w-full max-w-sm flex-col items-start justify-between rounded-lg bg-white p-6 shadow-[0px_8px_20px_rgba(0,0,0,0.1)] md:max-w-3xl md:flex-row md:items-center md:rounded-full"
      >
        <div className="flex flex-col items-start gap-10 md:ml-6 md:flex-row md:items-center md:gap-14">
          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="cursor-pointer bg-transparent text-[1.03rem] font-semibold text-gray-900 outline-none"
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {selectedCity ? selectedCity : "Please select location"}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="pickup-date"
              className="text-[1.03rem] font-semibold text-gray-900"
            >
              Pickup Date
            </label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="bg-transparent text-base text-gray-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="return-date"
              className="text-[1.03rem] font-semibold text-gray-900"
            >
              Return Date
            </label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              min={new Date().toISOString().split("T")[0]}
              className="bg-transparent text-base text-gray-500 outline-none"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="max-sm:mt-4 flex cursor-pointer items-center justify-center gap-1 rounded-full bg-primary px-9 py-3 text-white transition-colors duration-200 hover:bg-primary-dull"
        >
          <img src={assets.search_icon} alt="search" className="brightness-300" />
          Search
        </motion.button>
      </motion.form>

      <div className="relative z-10 w-full max-w-4xl px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[78%] h-10 w-[62%] -translate-x-1/2 rounded-full bg-slate-900/25 blur-2xl"
        />
        <motion.img
          initial={{ y: 100, opacity: 0 }}
        animate={{ y:0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
          src={mustang}
          alt="Mustang"
          className="relative z-10 mx-auto w-full drop-shadow-[0_18px_26px_rgba(15,23,42,0.24)]"
        />
      </div>
    </motion.div>
  );
};

export default Hero;
