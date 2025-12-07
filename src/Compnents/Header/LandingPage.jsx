import React, { useState } from 'react';
import image from "./../../img/img1.png"
import {
  BookOpen,
  Users,
  MessageCircle,
  ShoppingBag,
  Mic,
  Calendar,
  Briefcase,
  Play,
  ArrowRight
} from 'lucide-react';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('Courses');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f5] to-[#cca5a5] font-sans text-slate-900 selection:bg-pink-200 overflow-x-hidden relative">

      {/* CUSTOM STYLES FOR ANIMATION
      */}
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* Background Gradient Orbs (The "Glow" effect) */}
      <div className="fixed top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-100/60 rounded-full blur-[80px] md:blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="fixed top-20 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-50/80 rounded-full blur-[100px] md:blur-[120px] translate-x-1/3 -translate-y-1/2 pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-12 md:gap-20">

        {/*
          SECTION 1: INFINITE LOGO SLIDER
        */}
        <div className="w-full">
          <p className="text-center text-[10px] md:text-xs tracking-[0.2em] text-gray-400 font-bold uppercase mb-8">
            Trusted by +10,000 Consultants & Organisations
          </p>

          <div className="relative m-auto w-full max-w-5xl overflow-hidden bg-transparent 
            before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[50px] md:before:w-[100px] before:bg-gradient-to-r before:from-[#fff5f5] before:to-transparent 
            after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[50px] md:after:w-[100px] after:bg-gradient-to-l after:from-[#fff5f5] after:to-transparent">

            <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
              {/* Set 1 */}
              <LogoSet />
              {/* Set 2 (Duplicate for loop) */}
              <LogoSet />
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-12" />
        </div>

        {/* SECTION 2: HERO TEXT
        */}
        <div className="text-center max-w-4xl mx-auto space-y-6 px-2">
          <span className="inline-flex items-center p-3 md:p-4 py-2 md:py-2.5 rounded-full bg-[#e785bcb2] text-[#black] text-[10px] md:text-xs font-bold tracking-wider uppercase shadow-sm">
            Diversify Revenue Stream
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Maximise earnings with <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              limitless revenue streams.
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed px-4">
            Create and sell courses, consulting services, and communities - with Zero marketing cost and a built-in sales network.
          </p>
        </div>

        {/*
          SECTION 3: PILL NAVIGATION
        */}
        <div className="flex justify-center w-full">
          <div className="inline-flex items-center bg-white p-1.5 rounded-full shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 overflow-x-auto scrollbar-hide max-w-full gap-1 w-full md:w-auto px-2 md:px-1.5">
            <NavPill
              icon={<BookOpen size={16} />}
              label="Courses"
              active={activeTab === 'Courses'}
              onClick={() => setActiveTab('Courses')}
            />
            <NavPill
              icon={<Users size={16} />}
              label="Communities"
              active={activeTab === 'Communities'}
              onClick={() => setActiveTab('Communities')}
            />
            <NavPill
              icon={<MessageCircle size={16} />}
              label="Coaching"
              active={activeTab === 'Coaching'}
              onClick={() => setActiveTab('Coaching')}
            />
            <NavPill
              icon={<ShoppingBag size={16} />}
              label="Merchandise"
              active={activeTab === 'Merchandise'}
              onClick={() => setActiveTab('Merchandise')}
            />
            <NavPill
              icon={<Mic size={16} />}
              label="Podcasts"
              active={activeTab === 'Podcasts'}
              onClick={() => setActiveTab('Podcasts')}
            />
            <NavPill
              icon={<Calendar size={16} />}
              label="Events"
              active={activeTab === 'Events'}
              onClick={() => setActiveTab('Events')}
            />
            <NavPill
              icon={<Briefcase size={16} />}
              label="Brokerage"
              active={activeTab === 'Brokerage'}
              onClick={() => setActiveTab('Brokerage')}
            />
          </div>
        </div>

        {/* SECTION 4: FEATURE CARD (The "Blob" Layout)
          RESPONSIVE UPDATES:
          1. Removed fixed width/height (w-[1240px], h-[530px]).
          2. Used flex-col for mobile, lg:flex-row for desktop.
          3. Adjusted rounded corners for mobile (standard rounded) vs desktop (blob shape).
        */}
        <div className="relative shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10 w-full max-w-[1240px] mx-auto h-auto lg:h-[530px] rounded-[32px] lg:rounded-tl-[250px] lg:rounded-tr-[32px] lg:rounded-br-[32px] lg:rounded-bl-[250px]" style={{ background: 'linear-gradient(270.28deg, rgba(42, 0, 25, 0.46) 29.3%, #4C002D 98.92%)' }}>

          {/*LEFT SIDE (Content)*/}
          <div className="relative w-full lg:w-[45%] text-white flex flex-col justify-center p-8 md:p-14 lg:p-16 z-20 order-2 lg:order-1">

            {/* THE CURVE: Hidden on mobile, shown on Desktop */}
            <div className="hidden lg:block absolute top-0 right-0 h-full w-[200px] rounded-[100%] scale-y-[1.2] -z-10"></div>

            {/* Content Container */}
            <div className="relative z-10 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Courses</h2>

              <p className="text-pink-100/90 text-sm md:text-base font-medium mb-3 leading-relaxed">
                Turn your knowledge into structured, sellable products.
              </p>

              <div className="space-y-4 md:space-y-6 mb-6 md:mb-8 text-pink-200/80 text-sm leading-relaxed">
                <p>
                  Build online, drip, academic, or challenge-based courses with built-in tools for gamification, accountability, and engagement.
                </p>
                <p>
                  Every course is optimized to deliver value and generate recurring income.
                </p>
              </div>

              <button className="bg-[#2d0f23] hover:bg-black text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl w-full md:w-auto">
                Learn More
              </button>
            </div>
          </div>

          {/*RIGHT SIDE (Image & Floating Elements) */}
          <div className="relative w-full lg:w-[55%] h-[300px] md:h-[400px] lg:h-auto z-10 order-1 lg:order-2">
          
            {/* Background Image */}
            <img 
              src={image}
              alt="Course Preview" 
              className="w-full h-full p-4 object-cover rounded-[32px] lg:rounded-tl-[250px] lg:rounded-tr-[32px] lg:rounded-br-[32px] lg:rounded-bl-[250px]"
            />

            {/* Floating 'Subscribe' Button 
              RESPONSIVE: Centered on image for mobile, positioned specifically for Desktop
            */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:translate-y-0 lg:top-[40%] lg:left-auto lg:right-[15%] z-30 bg-white p-3 md:p-4 rounded-xl shadow-md">
              <button className="bg-[#1D8CF8] text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-xl font-bold shadow-blue-500/40 shadow-xl hover:scale-105 transition-transform duration-300 whitespace-nowrap ">
                Subscribe for $5.00/mo
              </button>
            </div>


            {/* Floating 'Player' Card 
              RESPONSIVE: Positioned at bottom for mobile, fixed position for Desktop.
              Width changed to fit small screens.
            */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-[280px] lg:left-[10%] xl:left-[340px] w-[90%] max-w-[386px] h-auto min-h-[85px] md:h-[95px] bg-white/95 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 flex items-center gap-3 md:gap-4 ">

              {/* Icon Box */}
              <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-blue-600 border border-blue-100 shrink-0">
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider">PT</span>
                <span className="text-xs md:text-sm font-bold leading-none">01</span>
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-xs md:text-sm truncate">
                  Lady Dentaa Amoateng MBE
                </h4>
                <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-[11px] mt-1 font-medium ">
                  <span>54 min</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>Oct 17, 2026</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-1.5 mt-2 md:mt-3 rounded-full overflow-hidden">
                  <div className="w-[40%] h-full bg-blue-500 rounded-full"></div>
                </div>
              </div>

              {/* Play Button */}
              <button className="h-8 w-8 md:h-10 md:w-10 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center text-blue-600 transition-colors shrink-0">
                <svg className="w-3 h-3 md:w-4 md:h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Sub Components

const LogoSet = () => (
  <div className="flex items-center justify-around gap-8 md:gap-24 px-6 md:px-24">
    <LogoText text="KODNET" />
    <LogoText text="UiA" className="italic font-serif" />
    <LogoText text="PlannIT" />
    <LogoText text="Kristiansand" className="font-light tracking-tighter" />
    <LogoText text="Innovasjon Norge" />
    <LogoText text="TERMOCONS" className="font-mono tracking-widest" />
    <LogoText text="LEVELS" />
  </div>
);

const LogoText = ({ text, className = "" }) => (
  <span className={`text-base md:text-2xl font-bold text-gray-300 whitespace-nowrap opacity-70 hover:opacity-100 hover:text-gray-500 transition-all duration-300 cursor-default select-none ${className}`}>
    {text}
  </span>
);

const NavPill = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0
      ${active
        ? 'bg-[#3e0030] text-white shadow-md transform scale-100'
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }
    `}
  >
    <span className={active ? 'text-pink-200' : 'text-current opacity-70'}>{icon}</span>
    <span>{label}</span>
  </button>
);

export default LandingPage;