import React, { useContext, useState } from 'react';
import { Bed, Bath, Move, Heart } from 'lucide-react';
import { PropertyContext } from '../../context/PropertyContext';
import Modal from '../Modal';

// 2. The Single Card Component
const PropertyCard = ({ property, toggleFavorite, onClick }) => {
  // Helper to format numbers with leading zero (e.g., 4 -> 04) to match design
  const formatCount = (num) => num < 10 ? `0${num}` : num;

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
      
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          onClick={onClick}
          src={property.mainImage} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
        />
        {/* Favorite Button (Optional, as seen in some designs) */}
        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(property.id); }} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white transition-colors">
             <Heart size={20} className={property.isFavorite ? "fill-red-500 text-red-500" : "text-white"} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6">
        
        {/* Icons Row: Beds, Baths, Area */}
        <div className="flex items-center gap-6 text-gray-500 mb-4 text-sm font-medium">
          {/* Bed */}
          <div className="flex items-center gap-2">
            <Bed size={18} className="text-gray-400" />
            <span>Bed-{formatCount(property.beds)}</span>
          </div>
          
          {/* Bath */}
          <div className="flex items-center gap-2">
            <Bath size={18} className="text-gray-400" />
            <span>Bathroom-{formatCount(property.baths)}</span>
          </div>
          
          {/* Area */}
          <div className="flex items-center gap-2">
            <Move size={16} className="text-gray-400" />
            <span>{property.area}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 text-left">
          {property.title}
        </h3>

        {/* Price and Location Row */}
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

// 3. The Main Grid Layout
const Gallery = () => {
  const { properties, toggleFavorite } = useContext(PropertyContext);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const propertiesToShow = properties.slice(0, 6);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Property</h1>
            <p className="text-gray-500 mt-1">Showing result- ({propertiesToShow.length})</p>
          </div>
          
          {/* Sort Dropdown (Visual only) */}
          <div className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer shadow-sm">
            Sort By
            <span className="font-bold text-gray-900">Low to High</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {propertiesToShow.map((item) => (
            <PropertyCard 
              key={item.id} 
              property={item} 
              toggleFavorite={toggleFavorite}
              onClick={() => openModal(item)}
            />
          ))}
        </div>

      </div>

      {isModalOpen && (
        <Modal property={selectedProperty} onClose={closeModal} />
      )}
    </div>
  );
};

export default Gallery;
