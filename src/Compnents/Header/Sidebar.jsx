import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Bed, Bath, Move, Heart, RefreshCw, ChevronDown, Check, Search } from 'lucide-react';

import { PropertyContext } from '../../context/PropertyContext';
import Modal from '../Modal';

// Custom styles for range sliders
const rangeSliderStyles = `
  input[type="range"].range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 5px;
    outline: none;
    background: var(--range-bg, #e5e7eb);
  }
  
  input[type="range"].range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--range-thumb, #701a52);
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(112, 26, 82, 0.35);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  input[type="range"].range::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 14px rgba(112, 26, 82, 0.5);
  }
  
  input[type="range"].range::-webkit-slider-thumb:active {
    transform: scale(1.25);
    box-shadow: 0 4px 18px rgba(112, 26, 82, 0.6);
  }
  
  input[type="range"].range::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--range-thumb, #701a52);
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(112, 26, 82, 0.35);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  input[type="range"].range::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 14px rgba(112, 26, 82, 0.5);
  }
  
  input[type="range"].range::-moz-range-thumb:active {
    transform: scale(1.25);
    box-shadow: 0 4px 18px rgba(112, 26, 82, 0.6);
  }
  
  input[type="range"].range::-moz-range-track {
    background: transparent;
    border: none;
  }
  
  input[type="range"].range::-moz-range-progress {
    background: var(--range-fill, #701a52);
  }

  input[type="range"].range::-webkit-slider-runnable-track {
    background: var(--range-bg, #e5e7eb);
    height: 8px;
    border-radius: 5px;
  }
`;

// Inject styles into document
const styleSheet = document.createElement('style');
styleSheet.textContent = rangeSliderStyles;
document.head.appendChild(styleSheet);

// --- 1. The Data (imported from data.json) ---
// Using `properties` (imported JSON) instead of inline/commented data.

// --- 2. Sub-Components ---

// Checkbox Row Component (interactive & keyboard accessible)
const FilterCheckbox = ({ label, checked, onChange }) => {
    const handleToggle = (e) => {
        e.preventDefault();
        if (typeof onChange === 'function') onChange();
    };

    return (
        <div
            role="checkbox"
            tabIndex={0}
            aria-checked={checked}
            onClick={handleToggle}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(e); } }}
            className="flex items-center gap-3 cursor-pointer group mb-3"
        >
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors 
      ${checked ? 'bg-[#701a52] border-[#701a52]' : 'bg-white border-gray-300 group-hover:border-[#701a52]'}`}>
                {checked && <Check size={14} className="text-white" />}
            </div>
            <span className="text-gray-700 font-medium text-sm">{label}</span>
        </div>
    );
};

// Sidebar Component
const Sidebar = ({ filters, setFilters, onReset }) => {
    const [collapsed, setCollapsed] = useState(false);
    // per-section open/collapse state
    const [sectionOpen, setSectionOpen] = useState({
        suburb: true,
        type: true,
        amenities: true
    });
    const toggleSection = (key) => setSectionOpen(prev => ({ ...prev, [key]: !prev[key] }));
    // per-section "see more" state (show first 3 by default)
    const [showAll, setShowAll] = useState({
        suburb: false,
        type: false,
        amenities: false
    });
    const toggleShowAll = (key) => setShowAll(prev => ({ ...prev, [key]: !prev[key] }));
    const MIN_PRICE = 0;
    const MAX_PRICE = 5000;

    // Calculate percentage positions for visual display
    const calculateMinPercent = () => ((filters.minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
    const calculateMaxPercent = () => ((filters.maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

    // Handle min price change from slider or input
    const handleMinPriceChange = (value) => {
        const numValue = isNaN(value) || value === '' ? MIN_PRICE : parseInt(value, 10);
        const validValue = Math.max(MIN_PRICE, Math.min(numValue, filters.maxPrice));
        setFilters(prev => ({
            ...prev,
            minPrice: validValue
        }));
    };

    // Handle max price change from slider or input
    const handleMaxPriceChange = (value) => {
        const numValue = isNaN(value) || value === '' ? MAX_PRICE : parseInt(value, 10);
        const validValue = Math.min(MAX_PRICE, Math.max(numValue, filters.minPrice));
        setFilters(prev => ({
            ...prev,
            maxPrice: validValue
        }));
    };

    // Legacy handler for backwards compatibility

    const handleTypeChange = (type) => {
        setFilters(prev => {
            const newTypes = prev.types.includes(type)
                ? prev.types.filter(t => t !== type)
                : [...prev.types, type];
            return { ...prev, types: newTypes };
        });
    };

    const handleSuburbChange = (suburb) => {
        setFilters(prev => {
            const newSuburbs = prev.suburbs.includes(suburb)
                ? prev.suburbs.filter(s => s !== suburb)
                : [...prev.suburbs, suburb];
            return { ...prev, suburbs: newSuburbs };
        });
    };

    const handleAmenityChange = (amenity) => {
        setFilters(prev => {
            const newAmenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity];
            return { ...prev, amenities: newAmenities };
        });
    };

    if (collapsed) {
        return (
            <div className="w-16 lg:w-16 flex-shrink-0 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 h-fit flex items-center justify-center">
                <button
                    onClick={() => setCollapsed(false)}
                    aria-label="Expand filters"
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                    <ChevronDown size={18} className="transform rotate-90 text-gray-700" />
                </button>
            </div>
        );
    }

    return (
        <div className="w-full lg:w-80 flex-shrink-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Property Preference</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onReset}
                        className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Reset Filter <RefreshCw size={12} />
                    </button>
                    <button
                        onClick={() => setCollapsed(true)}
                        aria-label="Collapse filters"
                        title="Collapse"
                        className="ml-2 p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        <ChevronDown size={14} className="-rotate-90" />
                    </button>
                </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* 1. Rent Budget */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">Rent Budget</h3>
                    <span className="text-[#701a52] font-bold text-sm">${filters.minPrice} - ${filters.maxPrice}</span>
                </div>

                {/* Custom Interactive Range Slider */}
                <div className="relative pt-2 pb-6">
                    {/* Background track */}
                    <div className="absolute top-4 left-0 right-0 h-2 bg-gray-200 rounded-full pointer-events-none"></div>

                    {/* Active range fill */}
                    <div
                        className="absolute top-4 h-2 bg-[#701a52] rounded-full pointer-events-none"
                        style={{
                            left: `${calculateMinPercent()}%`,
                            right: `${100 - calculateMaxPercent()}%`
                        }}
                    ></div>

                    {/* Min range slider */}
                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={filters.minPrice}
                        onChange={(e) => handleMinPriceChange(e.target.value)}
                        className="range relative w-full h-2 top-4 pointer-events-auto appearance-none bg-transparent cursor-pointer z-5 slider-min"
                        style={{
                            '--range-bg': '#e5e7eb',
                            '--range-thumb': '#701a52',
                            '--range-fill': calculateMinPercent(),
                            zIndex: filters.minPrice > MAX_PRICE - 500 ? 5 : 3
                        }}
                    />

                    {/* Max range slider */}
                    <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={filters.maxPrice}
                        onChange={(e) => handleMaxPriceChange(e.target.value)}
                        className="range relative w-full h-2 top-4 pointer-events-auto appearance-none bg-transparent cursor-pointer z-4 slider-max"
                        style={{
                            '--range-bg': '#e5e7eb',
                            '--range-thumb': '#701a52',
                            '--range-fill': calculateMaxPercent()
                        }}
                    />
                </div>

                {/* Min/Max Number Inputs */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Minimum</p>
                        <input
                            type="number"
                            min={MIN_PRICE}
                            max={filters.maxPrice}
                            value={filters.minPrice}
                            onChange={(e) => handleMinPriceChange(e.target.value)}
                            className="w-full bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-gray-900 font-bold text-sm focus:outline-none focus:border-[#701a52] focus:ring-2 focus:ring-[#701a52]/20"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Maximum</p>
                        <input
                            type="number"
                            min={filters.minPrice}
                            max={MAX_PRICE}
                            value={filters.maxPrice}
                            onChange={(e) => handleMaxPriceChange(e.target.value)}
                            className="w-full bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-gray-900 font-bold text-sm focus:outline-none focus:border-[#701a52] focus:ring-2 focus:ring-[#701a52]/20"
                        />
                    </div>
                </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* 2. Suburb */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-800">Suburb</h3>
                        <span className="text-sm text-gray-500">{filters.suburbs.length ? `${filters.suburbs.length} selected` : '-'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => toggleSection('suburb')}
                            aria-expanded={sectionOpen.suburb}
                            className="p-1 rounded hover:bg-gray-100"
                            title={sectionOpen.suburb ? 'Collapse' : 'Expand'}
                        >
                            <ChevronDown size={14} className={`transform transition-transform ${sectionOpen.suburb ? '' : '-rotate-90'}`} />
                        </button>
                    </div>
                </div>
                {sectionOpen.suburb && (
                    (() => {
                        const suburbOptions = [
                            'Eshelby Drive, Cranbrook',
                            '2-6 Eshelby Dr, Cannonvale',
                            '59/3 Eshelby Drive Cannonvale'
                        ];

                        return (
                            <div className="space-y-3">
                                {suburbOptions.map(s => (
                                    <FilterCheckbox key={s} label={s} checked={filters.suburbs.includes(s)} onChange={() => handleSuburbChange(s)} />
                                ))}

                            </div>
                        );
                    })()
                )}
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* 3. Property Type */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-800">Property Type</h3>
                        <span className="text-sm text-gray-500">{filters.types.length ? `${filters.types.length} selected` : '-'}</span>
                    </div>
                    <button
                        onClick={() => toggleSection('type')}
                        aria-expanded={sectionOpen.type}
                        className="p-1 rounded hover:bg-gray-100"
                        title={sectionOpen.type ? 'Collapse' : 'Expand'}
                    >
                        <ChevronDown size={14} className={`transform transition-transform ${sectionOpen.type ? '' : '-rotate-90'}`} />
                    </button>
                </div>
                {sectionOpen.type && (
                    (() => {
                        const typeOptions = ['House', 'Land', 'Apartment', 'Town House', 'Villa', 'Acreage'];
                        return (
                            <div>
                                {typeOptions.map(type => (
                                    <FilterCheckbox
                                        key={type}
                                        label={type}
                                        checked={filters.types.includes(type)}
                                        onChange={() => handleTypeChange(type)}
                                    />
                                ))}
                            </div>
                        );
                    })()
                )}
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* 4. Amenities */}
            <div className="mb-2">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-800">Amenities</h3>
                        <span className="text-sm text-gray-500">{filters.amenities.length ? `${filters.amenities.length} selected` : '-'}</span>
                    </div>
                    <button
                        onClick={() => toggleSection('amenities')}
                        aria-expanded={sectionOpen.amenities}
                        className="p-1 rounded hover:bg-gray-100"
                        title={sectionOpen.amenities ? 'Collapse' : 'Expand'}
                    >
                        <ChevronDown size={14} className={`transform transition-transform ${sectionOpen.amenities ? '' : '-rotate-90'}`} />
                    </button>
                </div>
                {sectionOpen.amenities && (
                    (() => {
                        const amenityOptions = ['Pet-friendly', 'Parking', 'Private Pool', 'Gym'];
                        const visible = showAll.amenities ? amenityOptions : amenityOptions.slice(0, 3);
                        return (
                            <div>
                                {visible.map(item => (
                                    <FilterCheckbox
                                        key={item}
                                        label={item}
                                        checked={filters.amenities.includes(item)}
                                        onChange={() => handleAmenityChange(item)}
                                    />
                                ))}
                                {amenityOptions.length > 3 && (
                                    <button onClick={() => toggleShowAll('amenities')} className="text-[#701a52] text-sm font-bold underline mt-2">
                                        {showAll.amenities ? 'Show less' : `See ${amenityOptions.length - 3} more`}
                                    </button>
                                )}
                            </div>
                        );
                    })()
                )}
            </div>

        </div>
    );
};

// Property Card Component
const PropertyCard = ({ property, onToggleFavorite, onClick }) => {
    const formatCount = (num) => num < 10 ? `0${num}` : num;

    return (
        <div className="bg-white rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
            <div className="relative h-60 w-full overflow-hidden">
                <img
                    onClick={onClick}
                    src={property.mainImage}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
                <div className="absolute top-4 right-4 p-2 bg-white/30 backdrop-blur-md rounded-full cursor-pointer" onClick={() => onToggleFavorite(property.id)}>
                    <Heart size={18} className={`${property.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </div>
            </div>

            <div className="p-5">
                {/* Icons Row */}
                <div className="flex items-center gap-4 text-gray-500 mb-3 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                        <Bed size={16} className="text-[#a5a5cd]" />
                        <span>Bed-{formatCount(property.beds)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath size={16} className="text-[#a5a5cd]" />
                        <span>Bathroom-{formatCount(property.baths)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Move size={14} className="text-[#a5a5cd]" />
                        <span>{property.area}</span>
                    </div>
                </div>

                <h3 className="text-left text-lg font-bold ls-R text-gray-900 mb-2 truncate">{property.title}</h3>

                <div className="flex items-center text-gray-600 gap-2">
                    <p className="text-gray-900 font-bold text-base">
                        ${property.price}<span className="text-gray-400 text-xs font-normal">/week</span>
                    </p>
                    <span className="text-gray-300">•</span>
                    <p className="text-gray-400 text-xs">{property.location}</p>
                </div>
            </div>
        </div>
    );
}
// Sort Dropdown Component (uses props; closes on outside click)
function SortDropdown({ sortBy, setSortBy }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function onDocClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        }
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    const labels = {
        'favorites': 'Favorites',
        'low-to-high': 'Low to High',
        'high-to-low': 'High to Low',
        'most-recent': 'Most Recent'
    };

    const handleSelect = (key) => {
        setSortBy(key);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(s => !s)}
                className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-3 text-sm"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className="text-gray-500">Sort By</span>
                <span className="font-bold text-gray-900">{labels[sortBy] || labels['low-to-high']}</span>
                <ChevronDown size={16} className="text-gray-400" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                    <ul className="py-1">
                        <li onClick={() => handleSelect('favorites')} className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${sortBy === 'favorites' ? 'font-semibold' : ''}`}>Favorites</li>
                        <li onClick={() => handleSelect('low-to-high')} className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${sortBy === 'low-to-high' ? 'font-semibold' : ''}`}>Low to High</li>
                        <li onClick={() => handleSelect('high-to-low')} className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${sortBy === 'high-to-low' ? 'font-semibold' : ''}`}>High to Low</li>
                        <li onClick={() => handleSelect('most-recent')} className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${sortBy === 'most-recent' ? 'font-semibold' : ''}`}>Most Recent</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

// --- 3. Main Page Component ---
const PropertyPage = () => {
    const { properties, toggleFavorite } = React.useContext(PropertyContext);
    // State for Filters
    const [filters, setFilters] = useState({
        minPrice: 100,
        maxPrice: 2000,
        types: [],
        suburbs: [],
        amenities: []
    });

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

    // Sort state (used by dropdown)
    const [sortBy, setSortBy] = useState('favorites'); // 'favorites' | 'low-to-high' | 'high-to-low' | 'most-recent'

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // show 6 cards per page

    // Filter + Sort Logic
    const filteredProperties = useMemo(() => {
        const result = properties.filter(p => {
          
            if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;

          
            if (filters.types.length > 0 && !filters.types.includes(p.type)) return false;

          
            if (filters.suburbs.length > 0 && !filters.suburbs.includes(p.location)) return false;

          
            if (filters.amenities.length > 0) {
                const hasAmenity = filters.amenities.every(filterTag =>
                    p.amenities.some(propTag => propTag.includes(filterTag) || filterTag.includes(propTag))
                );
                if (!hasAmenity) return false;
            }

            return true;
        });

        // Apply sorting
        const sorted = [...result];
        if (sortBy === 'favorites') {
            sorted.sort((a, b) => b.isFavorite - a.isFavorite);
        } else if (sortBy === 'low-to-high') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'high-to-low') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'most-recent') {
            // assume higher id = more recent
            sorted.sort((a, b) => b.id - a.id);
        }

        return sorted;
    }, [filters, sortBy, properties]);

    // Pagination calculations
    const totalItems = filteredProperties.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    useEffect(() => {
       
        setCurrentPage((prev) => {
            if (prev > totalPages) return 1;
            if (prev < 1) return 1;
            return prev;
        });
    }, [totalPages]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

    
    const getVisiblePages = (total, current, maxButtons = 5) => {
        if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1);

        const pages = [];
        const side = Math.floor((maxButtons - 3) / 2); 
        let left = Math.max(2, current - side);
        let right = Math.min(total - 1, current + side);

       
        if (current - 1 <= side) {
            left = 2;
            right = Math.max(2, maxButtons - 2);
        }
        if (total - current <= side) {
            right = total - 1;
            left = Math.min(total - 1, total - (maxButtons - 2));
        }

        pages.push(1);
        if (left > 2) pages.push('left-ellipsis');
        for (let p = left; p <= right; p++) pages.push(p);
        if (right < total - 1) pages.push('right-ellipsis');
        pages.push(total);
        return pages;
    };

  
    const resetFilters = () => {
        setFilters({
            minPrice: 0,
            maxPrice: 5000,
            types: [],
            suburbs: [],
            amenities: []
        });
    };

    return (
       <div className="min-h-screen bg-[#fafbfc] font-sans text-gray-900">
    <div className="max-w-[1440px] mx-auto px-4 py-8 lg:px-8">

        {/* Main Layout: Flex Container */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left: Sidebar */}
            <Sidebar
                filters={filters}
                setFilters={setFilters}
                onReset={resetFilters}
                className="w-full sm:w-64 lg:w-80 flex-shrink-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit overflow-y-auto"
            />

            {/* Right: Grid Content */}
            <div className="flex-1 w-full">

                {/* Top Header */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:flex-wrap justify-between items-center mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-0">
                        <h1 className="text-xl font-bold text-gray-900">Property</h1>
                        <span className="text-gray-400 text-sm font-medium">
                            --- Showing result- ({filteredProperties.length})
                        </span>
                    </div>

                    <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                </div>

                {/* Grid */}
                {totalItems > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                            {paginatedProperties.map((item) => (
                                <PropertyCard
                                    key={item.id}
                                    property={item}
                                    onToggleFavorite={toggleFavorite}
                                    onClick={() => openModal(item)}
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex flex-wrap items-center justify-between mt-6 gap-2">
                            {/* Page numbers (left) */}
                            <div className="join">
                                {getVisiblePages(totalPages, currentPage, 5).map((page, idx) => {
                                    if (page === 'left-ellipsis' || page === 'right-ellipsis') {
                                        return (
                                            <button key={`e-${idx}`} className="join-item btn btn-ghost cursor-default" disabled>
                                                ...
                                            </button>
                                        );
                                    }

                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                                        >{page}</button>
                                    );
                                })}
                            </div>

                            {/* Summary */}
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-semibold">{startIndex + 1}</span> - <span className="font-semibold">{endIndex}</span> of <span className="font-semibold">{totalItems}</span>
                            </div>

                            {/* Prev/Next (right) */}
                            <div className="join grid grid-cols-2 gap-2 sm:gap-0">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    className="join-item btn btn-outline"
                                    disabled={currentPage === 1}
                                >Previous</button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    className="join-item btn btn-outline"
                                    disabled={currentPage === totalPages}
                                >Next</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">No properties match your filters.</p>
                        <button onClick={resetFilters} className="mt-4 text-[#701a52] font-bold underline">Clear Filters</button>
                    </div>
                )}

            </div>

        </div>
    </div>
    {isModalOpen && (
        <Modal property={selectedProperty} onClose={closeModal} />
    )}
</div>

    );
};

export default PropertyPage;
