import React, { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { PropertyContext } from "../../context/PropertyContext";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const { favoriteCount } = useContext(PropertyContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(error => console.log(error));
  }

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between">

      {/* Left - Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="text-pink-600 text-2xl">🏠</div>
        <Link to="/" className="text-xl font-bold text-pink-700">WiztecBD</Link>
      </div>

      {/* Middle Menu */}
      <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
        <li className="cursor-pointer hover:text-pink-600">Buy</li>
        <li className="cursor-pointer hover:text-pink-600">Rent</li>
        <li className="cursor-pointer hover:text-pink-600">Sell</li>
        <li className="cursor-pointer hover:text-pink-600">Agents</li>
        <li className="cursor-pointer hover:text-pink-600">Blogs</li>
        <li className="cursor-pointer hover:text-pink-600">Contact Us</li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Favorite */}
        <div className="flex items-center gap-1 text-gray-600 cursor-pointer">
          <CiHeart className="text-xl" />
          <span>Favourite</span>
          <span className={`text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-1 ${favoriteCount > 0 ? 'bg-pink-600' : 'bg-transparent'}`}>
            {favoriteCount > 0 ? favoriteCount : ''}
          </span>
        </div>

        {/* Button */}
        (
          <button onClick={handleLogOut} className="bg-[#3e1d46] hover:bg-[#54265c] text-white px-5 py-2 rounded-full text-sm shadow">
            <Link to="/login">Logout</Link>
          </button>
        ) 
          
      
      </div>
    </nav>
  );
}
