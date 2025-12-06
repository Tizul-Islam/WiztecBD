import React, { useState } from 'react';
import { Play, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// --- DATA (Same as before) ---
const testimonials = [
  {
    id: 1,
    name: "Iva Ryan",
    role: "Marketing manager at Adobe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Content Creator", "Youtuber", "Growth Expert"],
    quote: "I recently had the opportunity to use the platform, and I must say, the feature that allows you to set your own commission is a game changer!",
    stat: "$2M",
    statLabel: "EARNED IN HELENUIL"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Product Lead at Figma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Designer", "Strategist", "SaaS"],
    quote: "The analytics dashboard provided insights we didn't even know we needed. It completely transformed our user acquisition strategy overnight.",
    stat: "+150%",
    statLabel: "GROWTH IN Q3"
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Founder at TechFlow",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Founder", "Tech", "Enterprise"],
    quote: "Scalability was our biggest concern. Growhubs handled our traffic spike of 1M+ users without a single hiccup. Truly enterprise-grade.",
    stat: "1M+",
    statLabel: "ACTIVE USERS"
  }
];

// --- 1. THE PROPER CARD COMPONENT ---
const TestimonialCard = ({ item }) => {
  return (
    // MAIN CARD LAYOUT
    // Mobile: w-full, h-auto, stacked (flex-col)
    // Desktop (lg): w-[1225px], h-[530px], rounded-[32px], row (flex-row)
    <div className="bg-white mx-auto shadow-2xl overflow-hidden relative
      flex flex-col lg:flex-row
      w-full lg:max-w-[1225px]
      h-auto lg:h-[530px]
      rounded-[24px] lg:rounded-[32px]
    ">
      
      {/* IMAGE SECTION 
        Mobile: w-full, h-64 (standard mobile height)
        Desktop: w-[454px], h-[487px], top-20.5px, left-24.5px (Simulated via padding/margin)
      */}
      <div className="flex-shrink-0 p-4 lg:py-[20.5px] lg:pl-[24.5px] lg:pr-0">
        <div className="relative group cursor-pointer overflow-hidden
          w-full h-64
          lg:w-[454px] lg:h-[487px]
          rounded-[24px] lg:rounded-[32px]
        ">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
               <div className="w-9 h-9 md:w-12 md:h-12 bg-[#F2F2F0] rounded-full flex items-center justify-center shadow-lg pl-1">
                  <Play size={20} className="text-[#4A3B32] fill-current w-4 h-4 md:w-5 md:h-5" />
               </div>
            </div>
          </div>

          {/* Scribble SVG */}
          <svg className="absolute top-4 right-4 text-white/80 w-12 h-12 opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor">
             <path d="M10,50 Q30,10 50,50 T90,50" strokeWidth="3" strokeDasharray="0" strokeLinecap="round" />
             <circle cx="80" cy="25" r="5" fill="currentColor" stroke="none" />
             <path d="M70,70 L90,50" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* CONTENT SECTION 
        Fills the remaining space 
      */}
      <div className="flex flex-col justify-center w-full p-6 md:p-8 lg:p-12 lg:pl-16">
         
         {/* Top Header */}
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
               <img src={item.avatar} alt="Avatar" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-sm object-cover" />
               <div>
                  <h3 className="font-bold text-[#1A1A1A] text-lg md:text-xl leading-tight">{item.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">Marketing manager at <span className="font-bold text-black">Adobe</span></p>
               </div>
            </div>
            <div className="flex gap-1 text-[#F5A623]">
               {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" stroke="none" />)}
            </div>
         </div>

         {/* Tags */}
         <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
            {item.tags.map(tag => (
               <span key={tag} className="px-3 md:px-5 py-1.5 md:py-2 rounded-full border border-gray-200 text-[10px] md:text-xs font-bold text-gray-700 bg-transparent hover:bg-gray-50 transition cursor-default">
                  {tag}
               </span>
            ))}
         </div>

         {/* Quote */}
         <div className="relative mb-6 md:mb-10 flex-grow">
             <blockquote className="text-[#1A1A1A] text-lg md:text-[22px] leading-relaxed font-medium">
               "{item.quote}"
             </blockquote>
             
             {/* Decorative Bubble (Desktop Only) */}
             <div className="hidden lg:block absolute right-0 -top-4 transform translate-x-4">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-gray-900">
                        <img src={item.image} className="w-full h-full object-cover opacity-80" alt="bubble" />
                    </div>
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-white transform -translate-y-1/2 rotate-45 border-l border-b border-gray-100"></div>
                </div>
             </div>
         </div>

         {/* Stats */}
         <div className="mt-auto">
            <h4 className="text-3xl md:text-[42px] font-black text-[#1A1A1A] tracking-tighter leading-none">{item.stat}</h4>
            <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mt-2">{item.statLabel}</p>
         </div>
      </div>
    </div>
  );
};

// --- 2. THE SLIDER COMPONENT ---
const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 font-sans overflow-hidden min-h-screen flex flex-col justify-center relative bg-[#2E0820]">
      
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#2E0820] to-[rgba(90,100,113,0.99)] pointer-events-none"></div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16 max-w-4xl mx-auto">
          <span className="inline-block bg-[#E88BE5] text-[#3d0f3a] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 md:mb-6">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Trusted by Creators<br />& Proven by Results.
          </h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
            See how others grow with Growhubs — real stories, real success.
          </p>
        </div>

        {/* Slider Logic */}
        <div className="relative w-full flex justify-center">
          
          {/* Arrow Buttons */}
          <button 
            onClick={prevSlide}
            className="hidden lg:flex absolute left-[5%] xl:left-[1%] top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="hidden lg:flex absolute right-[5%] xl:right-[1%] top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10"
          >
            <ChevronRight size={24} />
          </button>

          {/* SLIDER TRACK 
             Mobile: w-full
             Desktop: max-w-[1225px] (Matches your layout width)
          */}
          <div className="overflow-hidden w-full lg:max-w-[1225px] rounded-[32px]">
            <div 
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0 px-2">
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Mobile Dots Navigation */}
        <div className="flex justify-center mt-6 md:mt-8 gap-2 md:hidden">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/30 w-1.5'}`}
              />
            ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialSlider;