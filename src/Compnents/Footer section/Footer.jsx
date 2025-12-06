import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // For the X logo
import { RxActivityLog } from "react-icons/rx"; // Using generic icon for 'Threads' if needed, or use FaThreads in newer versions

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#271723] to-[#42233a] text-white overflow-hidden font-sans">
      
      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] h-[620px] px-6 md:px-20 pt-20 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* About Us */}
          <div className="space-y-6">
            <h3 className="font-semibold text-2xl">About Us</h3>
            <ul className="space-y-3 text-lg text-gray-300 font-medium">
              <li className="hover:text-white cursor-pointer transition">Resources</li>
              <li className="hover:text-white cursor-pointer transition">Company</li>
              <li className="hover:text-white cursor-pointer transition">Property</li>
              <li className="hover:text-white cursor-pointer transition">Contact Us</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-6">
            <h3 className="font-semibold text-2xl">Contact Us</h3>
            <div className="space-y-2 text-lg text-gray-300 font-bold">
              <p>hello.abc@gmail.com</p>
              <p>+012233455667</p>
            </div>
          </div>

          {/* Follow Us */}
          <div className="space-y-6 md:text-right md:items-end flex flex-col">
            <h3 className="font-semibold text-2xl self-start ">Follow Us</h3>
            
            {/* Social Icons with Circles */}
            <div className="flex flex-wrap gap-4 self-start ">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaXTwitter />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaWhatsapp />} />
              <SocialIcon icon={<RxActivityLog />} /> {/* Placeholder for Threads icon */}
              <SocialIcon icon={<FaTiktok />} />
            </div>

            <p className="text-gray-400 text-sm mt-8">
              © 2025 Havenix. All rights reserved.
            </p>
          </div>

        </div>
      </div>

      {/* Big Watermark Text */}
    
      <div className="absolute bottom-0 p-10 left-1/2 transform -translate-x-1/2 w-full flex justify-center pointer-events-none select-none ">
        <h1 
            className="font-bold bg-gradient-to-b from-[#5c415c] to-[#cac3c3] bg-clip-text text-transparent whitespace-nowrap leading-none"
            style={{
                fontSize: 'clamp(100px, 18vw, 290px)', 
                marginBottom: '-0.18em' 
            }}
        >
            WiztecBD
        </h1>
      </div>

    </footer>
  );
};

// Helper Component for Social Icons
const SocialIcon = ({ icon }) => {
  return (
    <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
      {icon}
    </div>
  );
};

export default Footer;