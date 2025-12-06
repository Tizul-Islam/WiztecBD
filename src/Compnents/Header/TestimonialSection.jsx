import React, { useState } from 'react';
import { Play, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// --- DATA ---
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
    <div className="bg-white rounded-[40px] p-6 md:p-8 shadow-2xl mx-auto w-full max-w-5xl flex flex-col md:flex-row gap-8 relative overflow-hidden">
      
      {/* Left Side: Video/Image */}
      <div className="w-full md:w-5/12 relative flex-shrink-0">
        <div className="rounded-[30px] overflow-hidden h-64 md:h-full relative group cursor-pointer w-full">
          <img 
            src={item.image} 
            alt={item.name} 
            className=" w-100 h-100 object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Play Button Overlay (Glassmorphism) */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center">
             {/* Outer Ring */}
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
               {/* Inner Circle */}
               <div className="w-12 h-12 bg-[#F2F2F0] rounded-full flex items-center justify-center shadow-lg pl-1">
                  <Play size={20} className="text-[#4A3B32] fill-current" />
               </div>
            </div>
          </div>
          
          {/* Decorative Scribble (Top Right) */}
          <svg className="absolute top-6 right-6 text-white/80 w-16 h-16 opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor">
             <path d="M10,50 Q30,10 50,50 T90,50" strokeWidth="3" strokeDasharray="0" strokeLinecap="round" />
             <circle cx="80" cy="25" r="5" fill="currentColor" stroke="none" />
             <path d="M70,70 L90,50" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Right Side: Content */}
      <div className="w-full md:w-7/12 flex flex-col justify-center">
         
         {/* Top Header: Avatar + Info + Stars */}
         <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
               <img src={item.avatar} alt="Avatar" className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover" />
               <div>
                  <h3 className="font-bold text-[#1A1A1A] text-xl leading-tight">{item.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">Marketing manager at <span className="font-bold text-black">Adobe</span></p>
               </div>
            </div>
            {/* Stars */}
            <div className="flex gap-1 text-[#F5A623]">
               {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" stroke="none" />)}
            </div>
         </div>

         {/* Tags (Pills) */}
         <div className="flex flex-wrap gap-3 mb-8">
            {item.tags.map(tag => (
               <span key={tag} className="px-5 py-2 rounded-full border border-gray-200 text-xs font-bold text-gray-700 bg-transparent hover:bg-gray-50 transition cursor-default">
                  {tag}
               </span>
            ))}
         </div>

         {/* Quote Section with Floating Bubble */}
         <div className="relative mb-10">
             <blockquote className="text-[#1A1A1A] text-xl leading-relaxed font-medium">
               "{item.quote}"
             </blockquote>
             
             {/* Floating Bubble Decoration (Right of Text) */}
             <div className="hidden lg:block absolute -right-4 -top-2 transform translate-x-full">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-gray-900">
                        <img src={item.image} className="w-full h-full object-cover opacity-80" alt="bubble" />
                    </div>
                    {/* Tiny triangle for speech bubble effect */}
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-white transform -translate-y-1/2 rotate-45 border-l border-b border-gray-100"></div>
                </div>
             </div>
         </div>

         {/* Stats - The Big Bold Text */}
         <div className="mt-auto">
            <h4 className="text-[42px] font-black text-[#1A1A1A] tracking-tighter leading-none">{item.stat}</h4>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mt-2">{item.statLabel}</p>
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
    <section className="py-0 px-0 md:px-0 font-sans overflow-hidden min-h-[900px] flex flex-col justify-center relative">
      
      {/* Background Gradient Hint */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#2E0820] to-[rgba(90,100,113,0.99)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#E88BE5] text-[#3d0f3a] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Trusted by Creators<br />& Proven by Results.
          </h2>
          <p className="text-gray-400 text-lg">
            See how others grow with Growhubs — real stories, real success.
          </p>
        </div>

        {/* Slider Logic */}
        <div className="relative">
          
          {/* Arrow Buttons (Desktop) */}
          <button 
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden px-4 md:px-0 w-[1225px] h-[530px] rounded-[42px]">
            <div 
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0 px-2 md:px-4">
                  {/* Apply the Proper Card Design Here */}
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2 md:hidden">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/30 w-2'}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;