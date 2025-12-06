import React, { useState, useEffect } from 'react';

const Modal = ({ property, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(property.mainImage);

    useEffect(() => {
        console.log("Property data in Modal:", property);
    }, [property]);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-3xl p-6 w-[90%] max-w-5xl relative" onClick={(e) => e.stopPropagation()}>

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 hover:text-gray-900 text-lg transition-colors">
                    ✕
                </button>

                {/* Main Image */}
                <img
                    src={selectedImage}
                    alt={property.title}
                    className="w-full h-[420px] object-cover rounded-2xl shadow-md"
                />

                {/* Thumbnail Row */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    {property.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            onClick={() => setSelectedImage(img)}
                            className={`
                                w-24 h-20 object-cover rounded-xl cursor-pointer
                                transition-all border-4
                                ${selectedImage === img ? "border-purple-500 scale-105" : "border-transparent"}
                            `}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Modal;