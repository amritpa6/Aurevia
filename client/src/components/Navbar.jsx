import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { assets, menuLinks } from "../assets/assets";
import { UseAppContext } from "../context/AppContext.jsx";
import {motion} from "motion/react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = UseAppContext();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-transparent px-4 pt-4 sm:px-6 lg:px-10"
    >
      <div
        className={`border-borderColor relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 text-gray-600 shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all sm:px-6 md:px-8 ${
          location.pathname === "/" ? "bg-light/90" : "bg-white/90"
        }`}
      >
        <Link to="/" className="select-none">
          <motion.span whileHover={{ scale: 1.02 }} className="brand-font text-2xl font-semibold text-gray-800">
            Aurevia
          </motion.span>
        </Link>

        <div
          className={`border-borderColor right-0 z-50 flex flex-col items-start gap-4 transition-all duration-300 max-sm:fixed max-sm:left-4 max-sm:right-4 max-sm:top-[88px] max-sm:rounded-2xl max-sm:border max-sm:p-5 max-sm:shadow-xl sm:flex-1 sm:flex-row sm:items-center sm:justify-center sm:gap-8 ${
            location.pathname === "/" ? "max-sm:bg-light/95 sm:bg-transparent" : "max-sm:bg-white/95 sm:bg-transparent"
          } ${open ? "max-sm:translate-y-0 max-sm:opacity-100" : "max-sm:pointer-events-none max-sm:-translate-y-3 max-sm:opacity-0"}`}
        >
          {menuLinks.map((link, index) => (
            <Link key={index} to={link.path}>
              {link.name}
            </Link>
          ))}

          <div className="flex w-full flex-col gap-3 pt-2 sm:hidden">
            <button onClick={() => (isOwner ? navigate("/owner") : changeRole())} className="cursor-pointer text-left">
              {isOwner ? "Dashboard" : "List Cars"}
            </button>
            <button
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
              className="bg-primary hover:bg-primary-dull cursor-pointer rounded-lg px-6 py-2 text-white transition-all"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        <div className="hidden items-center sm:flex">
          <button onClick={() => (isOwner ? navigate("/owner") : changeRole())} className="cursor-pointer">
            {isOwner ? "Dashboard" : "List Cars"}
          </button>
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="bg-primary hover:bg-primary-dull mx-4 cursor-pointer rounded-lg px-8 py-2 text-white transition-all"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>

        <button className="cursor-pointer sm:hidden" onClick={() => setOpen(!open)}>
          <img src={open ? assets.close_icon : assets.menu_icon} alt="" />
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;
