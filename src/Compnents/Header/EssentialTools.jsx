import React from 'react';

const EssentialTools = () => {
  const tools = [
    { title: "Payments", desc: "Responsibly sourced and eco-friendly fabrics for a better tomorrow.", icon: "💳", color: "text-red-500" },
    { title: "Analytics", desc: "Understand your growth with smart, built-in analytics.", icon: "📊", color: "text-blue-500" },
    { title: "Newsletters", desc: "Build your audience with engaging, branded newsletters.", icon: "✉️", color: "text-yellow-500" },
    { title: "Pages", desc: "Showcase your expertise with a personal profile that sells for you.", icon: "📄", color: "text-green-500" },
    { title: "Contact", desc: "Organize your contacts and turn them into your most valuable asset.", icon: "📒", color: "text-gray-700" },
    { title: "Emails", desc: "Showcase your expertise with a personal profile that sells for you.", icon: "📧", color: "text-purple-500" },
  ];

  return (
    <section className="bg-[#FFFBF2] py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#E5DBCB] text-[#594A42] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
            Essential Tools
          </span>
          <h2 className="text-5xl font-extrabold text-[#1A1A1A] mb-4 leading-tight">
            Essential Tools<br />Zero Distractions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Create diverse products on the platform and leverage our powerful tools to drive sales within and beyond GrowHubs.
          </p>
        </div>

        {/* Grid */}
        <div className="p-10 ">

          {/* 2. Add this Style Block for the animation (or put in index.css) */}
              <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0; /* Start invisible */
        }
              `}</style>

          {/* --- Top Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {tools.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-gray-200 hover:shadow-md transition-all animate-fade-in-up"
                // 3. Dynamic Delay: Each card waits 0.1s longer than the last
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-silka text-3xl font-bold text-[#4e4e4e]">{tool.title}</h3>
                  <span className="text-3xl">{tool.icon}</span>
                </div>
                <p className="text-gray-500 mb-5 text-left leading-relaxed text-sm">
                  {tool.desc}
                </p>
                <a href="#" className="text-[#C59D5F] font-bold text-sm flex items-center hover:opacity-80">
                  Learn more <span className="ml-2">→</span>
                </a>
              </div>
            ))}
          </div>

          {/* --- Bottom Large Section --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Card 4 (Co-sell): Delay based on tools length (3 * 0.1 = 0.3s) */}
            <div
              className="bg-white p-8 rounded-2xl shadow-sm lg:col-span-1 animate-fade-in-up"
              style={{ animationDelay: `${tools.length * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-bold text-[#4e4e4e]">Co-sell network</h3>
                <span className="text-3xl">🤝</span>
              </div>
              <p className="text-gray-500 mb-5 text-sm">
                Collaborate with others to sell more without ad spend or extra effort.
              </p>
              <a href="#" className="text-[#C59D5F] font-bold text-sm flex items-center">
                Learn more <span className="ml-2">→</span>
              </a>
            </div>

            {/* Card 5 (Enterprise): Delay based on tools length + 1 (0.4s) */}
            <div
              className="bg-gradient-to-r from-[#4D5D69] to-[rgba(153,105,107,0.99)] p-10 rounded-2xl shadow-sm lg:col-span-2 relative overflow-hidden text-white flex flex-col justify-center animate-fade-in-up"
              style={{ animationDelay: `${(tools.length + 1) * 0.1}s` }}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-bold text-[#FFD700] mb-4">Enterprise plan</h3>
                  <span className="text-4xl">🏢</span>
                </div>
                <p className="text-gray-300 mb-5 max-w-xl text-sm leading-relaxed">
                  Full white-label platform hosted on a dedicated, auto-scaling server. Includes branding freedom, private content protection, and 24/7 service availability.
                </p>
                <a href="#" className="text-[#FFD700] font-bold text-sm flex items-center hover:opacity-80">
                  Learn more <span className="ml-2">→</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default EssentialTools;