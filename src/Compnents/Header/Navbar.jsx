import React, { useContext, useState } from "react";
import { CiHeart, CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io"; // Added for close icon
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { PropertyContext } from "../../context/PropertyContext";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const { favoriteCount } = useContext(PropertyContext);
  const navigate = useNavigate();
  
  // State for Mobile Menu Toggle
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate('/login');
        setIsOpen(false); // Close menu on logout
      })
      .catch(error => console.log(error));
  }

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="px-6 py-3 flex items-center justify-between">
        
        {/* Left - Logo */}
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 cursor-pointer">
          <div className="text-pink-600 text-2xl">🏠</div>
          <span className="text-xl font-bold text-pink-700">WiztecBD</span>
        </Link>

        {/* Middle Menu - DESKTOP & TABLET (Hidden on Mobile) */}
        <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-pink-600 transition">Buy</li>
          <li className="cursor-pointer hover:text-pink-600 transition">Rent</li>
          <li className="cursor-pointer hover:text-pink-600 transition">Sell</li>
          <li className="cursor-pointer hover:text-pink-600 transition">Agents</li>
          <li className="cursor-pointer hover:text-pink-600 transition">Blogs</li>
          <li className="cursor-pointer hover:text-pink-600 transition">Contact Us</li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Favorite */}
          <div className="flex items-center gap-1 text-gray-600 cursor-pointer">
            <CiHeart className="text-2xl md:text-xl" />
            <span className="hidden sm:block">Favourite</span>
            <span className={`text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-1 ${favoriteCount > 0 ? 'bg-pink-600' : 'bg-transparent'}`}>
              {favoriteCount > 0 ? favoriteCount : ''}
            </span>
          </div>

          {/* Auth Button - Hidden on small mobile to save space, shown in dropdown, OR keep visible if preferred. 
              Here I kept it visible on all screens as per standard UX */}
          <div className="hidden sm:block">
            {user ? (
              <button onClick={handleLogOut} className="bg-[#500206fa] hover:bg-[#5c2a2a] text-white font-bold px-5 py-2 rounded-full text-sm shadow transition">
                Logout
              </button>
            ) : (
              <Link to="/login" className="bg-[#500206fa] hover:bg-[#5c2a2a] text-white font-bold px-5 py-2 rounded-full text-sm shadow transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button (Visible only on Mobile) */}
          <button 
            className="md:hidden text-2xl text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoMdClose /> : <CiMenuBurger />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Visible only when isOpen is true and on Mobile) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg absolute w-full left-0 top-full">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            <li className="cursor-pointer hover:text-pink-600 transition">Buy</li>
            <li className="cursor-pointer hover:text-pink-600 transition">Rent</li>
            <li className="cursor-pointer hover:text-pink-600 transition">Sell</li>
            <li className="cursor-pointer hover:text-pink-600 transition">Agents</li>
            <li className="cursor-pointer hover:text-pink-600 transition">Blogs</li>
            <li className="cursor-pointer hover:text-pink-600 transition">Contact Us</li>
          </ul>
          
          {/* Mobile Auth Button (If screen is very small < sm) */}
          <div className="sm:hidden mt-2">
            {user ? (
              <button onClick={handleLogOut} className="w-full bg-[#500206fa] hover:bg-[#5c2a2a] text-white font-bold px-5 py-2 rounded-full text-sm shadow transition">
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center w-full bg-[#500206fa] hover:bg-[#5c2a2a] text-white font-bold px-5 py-2 rounded-full text-sm shadow transition">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}