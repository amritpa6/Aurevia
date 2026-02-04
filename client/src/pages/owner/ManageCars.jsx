import React, { useEffect } from 'react'
import {assets} from '../../assets/assets';
import Title from '../../components/owner/Title';
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageCars = () => {

  const {axios, currency, isOwner} = UseAppContext();
  const [cars, setCars] = React.useState([]);

  const fetchOwnerCars = async () => {
    // Fetch the list of cars from the server or database
    try {
      const {data} = await axios.get('/api/owner/cars');
      if(data?.success){
        setCars(data.data);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const toggleAvailability = async (carId) => {
    // Fetch the list of cars from the server or database
    try {
      const {data} = await axios.post('/api/owner/toggle-car', {carId});
      if(data?.success){
        toast.success(data.message);
        fetchOwnerCars();
      }else{  
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteCar = async (carId) => {
    // Fetch the list of cars from the server or database
    try {
      const confirm = window.confirm("Are you sure you want to delete this car?");
      if(!confirm) return null;

      const {data} = await axios.post('/api/owner/delete-car', {carId});
      if(data?.success){
        toast.success(data.message);
        fetchOwnerCars();
      }else{  
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(isOwner) fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title title="Manage Your Cars" subtitle="View and manage the cars you have listed for booking." />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='bg-gray-50'>
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>

            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className='border-t border-borderColor' >
                <td className='p-3 flex items-center gap-3'>
                  <img src={car.image} alt=""className="h-12 w-12 aspect-square rounded-md object-cover"/>
                  <div className='max-md:hidden'>
                    <p className='font-medium'>
                      {car.brand} {car.model}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {car.seating_capacity} • {car.transmission}
                    </p>
                  </div>
                </td>

                <td className='p-3 max-md:hidden'>{car.category}</td>

                <td className='p-3 max-md:hidden'>$ {car.pricePerDay} / day</td>

                <td className='p-3 max-md:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>
                    {car.isAvailable ? "Available" : "Not Available" }
                  </span>
                </td>

                <td className='flex items-center p-3'>
                  <img onClick={() => toggleAvailability(car._id)} src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="" className=' cursor-pointer' />
                  <img onClick={() => deleteCar(car._id)} src={assets.delete_icon} alt="" className='cursor-pointer' />
                </td>

              </tr>
            ))}
          </tbody>
          

        </table>

      </div>
      
    </div>
  )
}

export default ManageCars
