import React, { useState, useEffect } from 'react';

const Modal = ({ property, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(property.mainImage);

    useEffect(() => {
        console.log("Property data in Modal:", property);
    }, [property]);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            {/* RESPONSIVE CONTAINER:
                - Mobile: w-full, p-4
                - Desktop: max-w-5xl, p-6
            */}
            <div 
                className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 w-full max-w-5xl relative shadow-2xl overflow-hidden flex flex-col" 
                onClick={(e) => e.stopPropagation()}
            >

                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 hover:text-black text-sm md:text-lg transition-colors z-10"
                >
                    ✕
                </button>

                {/* Main Image 
                    - Mobile: h-[250px]
                    - Tablet: h-[350px]
                    - Desktop: h-[420px]
                */}
                <div className="w-full h-[250px] sm:h-[350px] lg:h-[420px] rounded-xl md:rounded-2xl overflow-hidden shadow-sm bg-gray-50">
                    <img
                        src={selectedImage}
                        alt={property.title}
                        className="w-full h-full object-cover transition-all duration-300"
                    />
                </div>

                {/* Thumbnail Row 
                    - Mobile: flex-nowrap (scrollable) or flex-wrap. 
                    - Added overflow-x-auto for mobile to prevent overflow if many images exist.
                */}
                <div className="flex items-center justify-start md:justify-center gap-2 md:gap-4 mt-4 md:mt-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {property.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            onClick={() => setSelectedImage(img)}
                            className={`
                                flex-shrink-0
                                w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-20 
                                object-cover rounded-lg md:rounded-xl cursor-pointer
                                transition-all border-2 md:border-4
                                ${selectedImage === img ? "border-purple-500 scale-105 opacity-100" : "border-transparent opacity-70 hover:opacity-100"}
                            `}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Modal;