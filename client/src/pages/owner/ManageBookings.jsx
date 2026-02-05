import React from 'react'
import {assets } from '../../assets/assets';
import Title from '../../components/owner/Title';
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const ManageBookings = () => {

  const {axios, currency, isOwner} = UseAppContext();

  const [bookings, setBookings] = React.useState([]);

  const fetchOwnerBookings = async () => {
    // Fetch the list of bookings from the server or database
    try {
      const {data} = await axios.get('/api/booking/owner');
      if(data?.success){
        setBookings(data.data);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    // Fetch the list of bookings from the server or database
    try {
      const {data} = await axios.post('/api/booking/change-status', {bookingId, status});
      if(data?.success){
        toast.success(data.message);
        fetchOwnerBookings();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }


  React.useEffect(() => {
    if(isOwner) fetchOwnerBookings();
  }, [isOwner]);

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title title="Manage Bookings" subtitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."/>

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>

        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='bg-gray-50'>
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              const car = booking.car;
              const hasCar = Boolean(car);
              const carName = hasCar ? `${car.brand} ${car.model}` : "Car removed";
              const carImage = hasCar ? car.image : assets.main_car;

              return (
              <tr key={index} className='border-t border-borderColor text-gray-500' >
                
                <td className='p-3 flex items-center gap-3'>
                  <img src={carImage} alt="" className='h-12 w-12 aspect-square rounded-md object-cover'/>
                  <p className=' font-medium max-md:hidden'>{carName}</p>
                </td>

                <td className='p-3 max-md:hidden'>
                  {booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}
                </td>

                <td className='p-3'>
                  $ {booking.price}
                </td>

                <td className='p-3 max-md:hidden'>
                  <span className=' bg-gray-100 px-3 py-1 rounded-full text-xs'>offline</span>
                </td>

                <td className='p-3'>
                  {booking.status === "pending" ? (
                    <select onChange={(e) => changeBookingStatus(booking._id, e.target.value)} value={booking.status} className='px-2 py-1.5 mt-1 text-gray-500 border border-bordercolor rounded-md outline-nonel'>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status=== "confirmed" ? "bg-green-100 text-green-500" :"bg-red-100 text-red-500"}`}>{booking.status}</span>
                  )}
                </td>


              </tr>
            )})}
          </tbody>
          

        </table>

      </div>
      
    </div>
  )
}

export default ManageBookings
