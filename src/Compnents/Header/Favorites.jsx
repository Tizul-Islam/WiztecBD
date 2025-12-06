import React, { useContext,} from 'react';
import { Bed, Bath, Move, Heart } from 'lucide-react';
import { PropertyContext } from '../../context/PropertyContext';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, toggleFavorite }) => {
  const formatCount = (num) => num < 10 ? `0${num}` : num;

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button onClick={() => toggleFavorite(property.id)} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white transition-colors">
             <Heart size={20} className={property.isFavorite ? "fill-red-500 text-red-500" : "text-white"} />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-6 text-gray-500 mb-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Bed size={18} className="text-gray-400" />
            <span>Bed-{formatCount(property.beds)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={18} className="text-gray-400" />
            <span>Bathroom-{formatCount(property.baths)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Move size={16} className="text-gray-400" />
            <span>{property.area}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 text-left">
          {property.title}
        </h3>
        <div className="flex items-center text-gray-600 gap-2">
          <p className="text-gray-900 font-bold text-lg">
            ${property.price}
            <span className="text-gray-500 text-sm font-normal">/{property.period}</span>
          </p>
          <span className="text-gray-300">•</span>
          <p className="text-gray-500 text-sm">{property.location}</p>
        </div>
      </div>
    </div>
  );
};

const Favorites = () => {
  const { properties, toggleFavorite } = useContext(PropertyContext);
  const favoriteProperties = properties.filter(p => p.isFavorite);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Favorite Properties</h1>
            <p className="text-gray-500 mt-1">Showing ({favoriteProperties.length}) favorite items</p>
          </div>
           <Link to="/" className="text-pink-600 hover:underline">Back to Gallery</Link>
        </div>

        {favoriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {favoriteProperties.map((item) => (
              <PropertyCard key={item.id} property={item} toggleFavorite={toggleFavorite} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">You haven't favorited any properties yet.</h2>
            <p className="text-gray-500">Click the heart icon on any property to save it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;