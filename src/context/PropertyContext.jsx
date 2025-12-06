import React, { createContext, useState, useMemo } from 'react';
import initialProperties from '../../data.json';

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [properties, setProperties] = useState(
        // Initialize isFavorite from localStorage or default to false
        initialProperties.map(p => ({
            ...p,
            isFavorite: JSON.parse(localStorage.getItem(`favorite-${p.id}`)) || false,
        }))
    );

    const toggleFavorite = (id) => {
        setProperties(prevProperties =>
            prevProperties.map(p => {
                if (p.id === id) {
                    const newFavoriteStatus = !p.isFavorite;
                    // Update localStorage
                    localStorage.setItem(`favorite-${p.id}`, JSON.stringify(newFavoriteStatus));
                    return { ...p, isFavorite: newFavoriteStatus };
                }
                return p;
            })
        );
    };

    const favoriteCount = useMemo(() => {
        return properties.filter(p => p.isFavorite).length;
    }, [properties]);

    const value = {
        properties,
        toggleFavorite,
        favoriteCount,
    };

    return (
        <PropertyContext.Provider value={value}>
            {children}
        </PropertyContext.Provider>
    );
};
