import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { assets, menuLinks } from "../assets/assets";
import { UseAppContext } from "../context/AppContext.jsx";
import { motion } from "motion/react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    UseAppContext();
  const userInitial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data?.success) {
        setIsOwner(true);
        toast.success(data.message);
        navigate("/owner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`relative z-50 px-6 pt-6 sm:px-10 lg:px-16 ${
        location.pathname === "/" ? "bg-[#c7cfdb]" : "bg-transparent"
      }`}
    >
      <div
        className="border-borderColor relative mx-auto flex max-w-6xl items-center justify-between rounded-2xl border bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.10)] transition-all duration-200 sm:px-6"
      >
        <Link to="/" className="select-none">
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="brand-font text-2xl font-bold text-gray-800"
          >
            Aurevia
          </motion.span>
        </Link>

        <div
          className={`border-borderColor absolute left-4 right-4 top-[84px] z-50 flex flex-col items-start gap-3 rounded-2xl border p-5 shadow-xl transition-all duration-200 max-sm:bg-white/95 sm:static sm:left-auto sm:right-auto sm:top-auto sm:z-auto sm:flex-1 sm:flex-row sm:items-center sm:justify-center sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none ${open ? "max-sm:translate-y-0 max-sm:opacity-100" : "max-sm:pointer-events-none max-sm:-translate-y-2 max-sm:opacity-0"}`}
        >
          {menuLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-base transition-all duration-200 ${
                  isActive
                    ? "bg-gray-200 font-semibold text-gray-900"
                    : "font-medium text-gray-700 hover:bg-black/[0.04] hover:text-gray-900"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="mt-2 flex w-full flex-col gap-3 sm:hidden">
            <button
              onClick={() => (isOwner ? navigate("/owner") : changeRole())}
              className="cursor-pointer text-left font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900"
            >
              {isOwner ? "Dashboard" : "List Cars"}
            </button>
            <button
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
              className="bg-primary/95 hover:bg-primary cursor-pointer rounded-lg px-5 py-2 text-white transition-colors duration-200"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="cursor-pointer font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900"
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </button>

          {user && (
            <button
              onClick={() => navigate("/my-bookings")}
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-borderColor/80 bg-white ring-1 ring-black/5 transition-all duration-200"
              title="My Account"
            >
              {user.image ? (
                <img src={user.image} alt="profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-semibold text-primary">{userInitial}</span>
              )}
            </button>
          )}

          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="bg-primary/95 hover:bg-primary cursor-pointer rounded-lg px-6 py-2 text-white transition-colors duration-200"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>

        <button
          className="cursor-pointer sm:hidden"
          onClick={() => setOpen(!open)}
        >
          <img src={open ? assets.close_icon : assets.menu_icon} alt="" />
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;
