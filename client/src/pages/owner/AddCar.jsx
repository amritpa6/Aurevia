import React from 'react'
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddCar = () => {

  const {axios} = UseAppContext();

  const [image,setImage] = React.useState(null);
  const [car,setCar] = React.useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: ""
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmitHandler = async (e) => {
    if(isLoading) return null;
    setIsLoading(true);
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', image);
      formData.append('carData', JSON.stringify(car));

      const {data} = await axios.post('/api/owner/add-car', formData);

      if(data?.success){
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: "",
          location: "",
          description: ""
        });
      }else{
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title title="Add New Car" subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."/>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

        {/* Car Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor='car-image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer'/> 
            <input type="file" id='car-image' accept='image/*' hidden onChange={(e)=>{
              setImage(e.target.files[0])}}/>
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your car</p>
        </div>

        {/* Car Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label htmlFor='brand'>Brand</label>
            <input type="text" id='brand' placeholder ='e.g BMW, Mercedes, Audi...' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-ind outline-none'
            value={car.brand} onChange={(e) => setCar({...car, brand: e.target.value})} />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='model'>Model</label>
            <input type="text" id='model' placeholder ='e.g X5, C-Class, A4...' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-ind outline-none'
            value={car.model} onChange={(e) => setCar({...car, model: e.target.value})} />
          </div>
        </div>

        {/* Car Year & Price & Category */}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label htmlFor='year'>Year</label>
            <input type="text" id='year' placeholder ='e.g 2020, 2021, 2022...' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-ind outline-none'
            value={car.year} onChange={(e) => setCar({...car, year: e.target.value})} />
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor='price'>Price Per Day ($)</label>
            <input type="text" id='price' placeholder ='e.g 50, 100, 150...' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-ind outline-none'
            value={car.pricePerDay} onChange={(e) => setCar({...car, pricePerDay: e.target.value})} />
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor='category'>Category</label>
            <select id="category" onChange ={(e) => setCar({...car, category: e.target.value})}
            className='px-3 py-2 mt-1 border border-borderColor rounded-ind outline-none bg-white cursor-pointer' value={car.category} required>
              <option value="">Select Category</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Convertible">Convertible</option>
              <option value="Coupe">Coupe</option>
              <option value="Minivan">Minivan</option>
              <option value="Pickup Truck">Pickup Truck</option>
              <option value="Wagon">Wagon</option>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel Type, Seating Capacity */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label htmlFor='transmission'>Transmission</label>
            <select id="transmission" onChange ={(e) => setCar({...car, transmission: e.target.value})}
            className='px-3 py-2 mt-1 border border-borderColor rounded-ind outline-none bg-white cursor-pointer' value={car.transmission} required>
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor='fuelType'>Fuel Type</label>
            <select id="fuelType" onChange ={(e) => setCar({...car, fuel_type: e.target.value})}
            className='px-3 py-2 mt-1 border border-borderColor rounded-ind outline-none bg-white cursor-pointer' value={car.fuel_type} required>
              <option value="">Select a fuel type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor='seatingCapacity'>Seating Capacity</label>
            <input type="text" id='seatingCapacity' placeholder ='e.g 4, 5, 7...' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-ind outline-none'
            value={car.seating_capacity} onChange={(e) => setCar({...car, seating_capacity: e.target.value})} />
          </div>
         
        </div>

        {/* Car location */}
        
        <div className='flex flex-col w-full'>
            <label htmlFor='location'>Location</label>
            <select id="location" onChange ={(e) => setCar({...car, location: e.target.value})}
            className='px-3 py-2 mt-1 border border-borderColor rounded-ind outline-none bg-white cursor-pointer' value={car.location} required>
              <option value="">Select a location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Houston">Houston</option>
              <option value="Miami">Miami</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Seattle">Seattle</option>
              <option value="Boston">Boston</option>
              <option value="Washington D.C.">Washington D.C.</option>
              <option value="Atlanta">Atlanta</option>
            </select>
        </div>
  

        {/* Description */}
        <div className='flex flex-col w-full'>
            <label htmlFor='description'>Description</label>
            <textarea rows={5} name="description" id="description" placeholder ='e.g Comfortable and spacious...' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-ind outline-none'
            value={car.description} onChange={(e) => setCar({...car, description: e.target.value})} />
        </div>


        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
          <img src={assets.tick_icon} alt="" />
          {isLoading ? "Listing..." : "List Your Car"}
        </button>
      

      </form>
      
    </div>
  )
}

export default AddCar
