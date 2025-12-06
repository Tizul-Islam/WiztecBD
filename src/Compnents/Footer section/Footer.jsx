import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 
import { RxActivityLog } from "react-icons/rx"; 

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b rounded-t-[32px] from-[#271723] to-[#42233a] text-white overflow-hidden font-sans h-auto w-full">
      
      {/* Main Content Container 
          - Removed fixed height (h-[620px])
          - Added dynamic padding-bottom (pb-32 md:pb-64) to make room for the big text
      */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-32 md:pt-20 md:pb-64">
        
        {/* Grid Layout: Stack on mobile (grid-cols-1), 3 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 text-center md:text-left">
          
          {/* About Us */}
          <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-2xl">About Us</h3>
            <ul className="space-y-3 text-lg text-gray-300 font-medium">
              <li className="hover:text-white cursor-pointer transition">Resources</li>
              <li className="hover:text-white cursor-pointer transition">Company</li>
              <li className="hover:text-white cursor-pointer transition">Property</li>
              <li className="hover:text-white cursor-pointer transition">Contact Us</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-2xl">Contact Us</h3>
            <div className="space-y-2 text-lg text-gray-300 font-bold">
              <p>hello.abc@gmail.com</p>
              <p>+012233455667</p>
            </div>
          </div>

          {/* Follow Us 
              - Mobile: Centered
              - Desktop: Aligned Right
          */}
          <div className="space-y-6 flex flex-col items-center md:items-end md:text-right">
            <h3 className="font-semibold text-2xl">Follow Us</h3>
            
            {/* Social Icons with Circles */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaXTwitter />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaWhatsapp />} />
              <SocialIcon icon={<RxActivityLog />} /> 
              <SocialIcon icon={<FaTiktok />} />
            </div>

            <p className="text-gray-400 text-sm mt-4 md:mt-8">
              © 2025 Havenix. All rights reserved.
            </p>
          </div>

        </div>
      </div>

      {/* Big WiztecBD Text 
          - Positioned absolute at bottom
          - Scaled using vw (viewport width) so it's always proportional
      */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden">
        <h1 
            className="font-bold bg-gradient-to-b from-[#5c415c] to-[#cac3c3] bg-clip-text text-transparent whitespace-nowrap leading-none text-center"
            style={{
                // Scales smoothly from mobile to desktop
                fontSize: '18vw', 
                marginBottom: '-0.2em' 
            }}
        >
            WiztecBD
        </h1>
      </div>

    </footer>
  );
};

// Social Icons Component
const SocialIcon = ({ icon }) => {
  return (
    <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
      {icon}
    </div>
  );
};

export default Footer;