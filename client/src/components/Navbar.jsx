import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { assets, menuLinks } from "../assets/assets";
import { UseAppContext } from "../context/AppContext.jsx";
import {motion} from "motion/react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = UseAppContext();

  const changeRole = async () => {
    try {
      const {data} = await axios.post('/api/owner/change-role');
      if (data?.success) {
        setIsOwner(true);
        toast.success(data.message);
        navigate('/owner');
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}  
      className={`border-borderColor relative flex items-center justify-between border-b px-6 py-4 text-gray-600 transition-all md:px-16 lg:px-24 xl:px-32 ${location.pathname === "/" && "bg-light"}`}
    >
      <Link to="/" className="select-none">
        <motion.span whileHover={{ scale: 1.02 }} className="brand-font text-2xl font-semibold text-gray-800">
          Aurevia
        </motion.span>
      </Link>

      <div
        className={`border-borderColor right-0 z-50 flex flex-col items-start gap-4 transition-all duration-300 max-sm:fixed max-sm:top-16 max-sm:h-screen max-sm:w-full max-sm:border-t max-sm:p-4 sm:flex-1 sm:flex-row sm:items-center sm:justify-center sm:gap-8 ${location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}

      </div>

      <div>
        <button onClick={() => isOwner ? navigate("/owner") : changeRole()} className="cursor-pointer">
          {isOwner ? "Dashboard" : "List Cars"}
        </button>
        <button
          onClick={() => {user? logout() :setShowLogin(true)}}
          className="bg-primary hover:bg-primary-dull mx-4 cursor-pointer rounded-lg px-8 py-2 text-white transition-all"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>

      <div>
        <button
          className="cursor-pointer sm:hidden"
          onClick={() => setOpen(!open)}
        >
          <img src={open ? assets.close_icon : assets.menu_icon} alt="" />
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;
