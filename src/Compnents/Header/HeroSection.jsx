import React from 'react';
import { ArrowRight } from 'lucide-react';

// --- 1. Define the Missing MetricCard Component ---
const MetricCard = ({ colors, label, value, description }) => {
  return (
    <div
      className="rounded-2xl p-6 border border-white/5 flex flex-col justify-between min-h-[160px]"
      style={{ backgroundColor: colors.bgCard }}
    >
      <div>
        <p
          className="text-xs font-bold tracking-widest mb-3 uppercase"
          style={{ color: colors.textGray }}
        >
          {label}
        </p>
        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
          {value}
        </h3>
      </div>
      <p className="text-sm text-gray-400 leading-snug">
        {description}
      </p>
    </div>
  );
};

// --- 2. Your Existing HeroSection ---
const HeroSection = () => {

  const colors = {
    bgDark: '#1E0A18',      // The main deep purple/brown background
    bgCard: '#2A1221',      // Slightly lighter background for cards
    accentPink: '#E93D82',  // The pink used for the button
    bgBanner: '#F5E6C8',    // The beige banner background
    textBanner: '#4A3B32',  // The dark brown text in the banner
    textGray: '#A3989F'     // Lighter text for labels
  };

  return (
    <div className="min-h-screen bg-[#2A0019] text-white relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">

      {/* --- Background Ambient Glow Effects --- */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-purple-900/40 rounded-full blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Tiny Stars/Particles */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-40 right-40 w-1.5 h-1.5 bg-purple-200 rounded-full opacity-40" />
      <div className="absolute bottom-1/3 left-10 w-1 h-1 bg-white rounded-full opacity-30" />

      {/* --- Main Content Container --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-10 flex flex-col items-center">

        {/* Top Badge */}
        <div className="mb-8">
          <span className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-gray-300">
            Build for You
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
          Built for <span className="text-gray-200">Creators</span>.<br />
          Powered for <span className="text-gray-200">Profit</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-center max-w-2xl text-lg md:text-xl mb-10 leading-relaxed">
          Create and sell courses, consulting services, and communities - with Zero marketing cost and a built-in sales network.
        </p>

        {/* Email Input & CTA */}
        <div className="w-full max-w-lg relative mb-20 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-30 blur group-hover:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center bg-[#1a1025] border border-white/10 rounded-full p-1.5 pl-6">
            <input
              type="email"
              placeholder="Enter Your Email Here"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm md:text-base"
            />
            <button className="bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-purple-500/25">
              Start for Free
              <span className="block text-[10px] font-normal opacity-80 leading-none mt-0.5">No credit card Required</span>
            </button>
          </div>
          <p className="text-[10px] text-gray-500 text-center mt-3">
            By proceeding you agree to our Platform terms & Privacy Notice
          </p>
        </div>

        {/* --- The Stats Card --- */}
        <div className="w-full flex justify-center"> {/* Removed min-h-screen/bg-black wrapper for cleaner integration */}
          <div
            className="w-full max-w-6xl rounded-[32px] overflow-hidden relative shadow-2xl border border-white/5"
            style={{ backgroundColor: '#290423' }}
          >

            {/* Top Section Padding Container */}
            <div className="p-8 md:p-12">

              {/* Header: Title and Button */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight max-w-lg">
                  Sell from day one - even with zero audience
                </h2>
                <button
                  className="px-6 py-2.5 rounded-full border font-medium transition-all hover:bg-white/5 whitespace-nowrap"
                  style={{
                    borderColor: colors.accentPink,
                    color: colors.accentPink
                  }}
                >
                  Open calculator
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <MetricCard
                  colors={colors}
                  label="CO-SELLERS IN NETWORK"
                  value="21,500+"
                  description="People who can co-promote"
                />
                <MetricCard
                  colors={colors}
                  label="EXPECTED BUYERS / MONTH"
                  value="86"
                  description="With zero personal audience"
                />
                <MetricCard
                  colors={colors}
                  label="EST. MRR AT US$9/MO"
                  value="US$774"
                  description="From membership sales"
                />
                <MetricCard
                  colors={colors}
                  label="EARN W/O A PRODUCT"
                  value="US$300"
                  description="Just by co-selling"
                />
              </div>
            </div>

            {/* Bottom Banner Section */}
            <div className="relative bottom-10 mt-8">


              <div
                className="p-3 text-center text-sm md:text-lg font-medium leading-relaxed flex items-center justify-center "
                style={{ backgroundColor: colors.bgBanner, color: colors.textBanner }}
              >
                <p className='w-full'>
                  Unlike Kajabi, Teachable, or Skool, Growhubs helps you find and convert clients inside the platform so you can sell from day one.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;