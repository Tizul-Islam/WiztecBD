import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Compnents/Footer section/Footer';
import Navbar from '../Compnents/Header/Navbar';
import Sidebar from '../Compnents/Header/Sidebar';
import EssentialTools from '../Compnents/Header/EssentialTools';
import TestimonialSection from '../Compnents/Header/TestimonialSection';
import LandingPage from '../Compnents/Header/LandingPage';
import HeroSection from '../Compnents/Header/HeroSection';
import { PropertyProvider } from '../context/PropertyContext';

const Main = () => {
    
    return (
        <PropertyProvider>
            <div>
                <Navbar />
                <Sidebar />                
                <HeroSection />
                <LandingPage />
                <TestimonialSection />
                <EssentialTools />
                <Outlet />
                <Footer />
            </div>
        </PropertyProvider>
    );
};

export default Main;