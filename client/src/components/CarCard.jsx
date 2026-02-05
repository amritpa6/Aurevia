import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car, appearance = "default" }) => {
  const currencySymbol = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const isFeatured = appearance === "featured";
  const isAvailable = car?.isAvailable ?? car?.isAvaliable;

  if (!car) return null;

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl border border-borderColor/80 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-1"
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0,0);
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt="Car Image"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
        />

        {isAvailable && (
          <p className="absolute left-4 top-4 rounded-full bg-primary/90 px-2.5 py-1 text-xs text-white">
            Available Now
          </p>
        )}

        <div className="absolute bottom-4 right-4 rounded-lg bg-black/80 px-3 py-2 text-white">
          <span className="font-semibold">
            {currencySymbol}
            {car.pricePerDay}
          </span>
          <span className="text-sm text-white/80"> / day</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3
              className={`${
                isFeatured ? "text-xl font-semibold" : "text-lg font-medium"
              } text-gray-900`}
            >
              {car.brand} {car.model}
            </h3>
            <p className={`${isFeatured ? "text-gray-500" : "text-gray-600"}`}>
              {car.category} • {car.year}
            </p>
          </div>
        </div>

        <div
          className={`mt-4 grid grid-cols-2 gap-y-2 text-sm ${
            isFeatured ? "text-gray-500" : "text-gray-600"
          }`}
        >
          <div className="flex items-center">
            <img src={assets.users_icon} alt="" className="mr-2 h-4" />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center">
            <img src={assets.fuel_icon} alt="" className="mr-2 h-4" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center">
            <img src={assets.car_icon} alt="" className="mr-2 h-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <img src={assets.location_icon} alt="" className="mr-2 h-4" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
