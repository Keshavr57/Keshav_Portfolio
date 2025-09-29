import { useState, useEffect } from 'react';
import myimg from "../assets/myphoto.jpeg"
// import myPhoto from "./myphoto.jpeg"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex items-center px-6 md:px-16 relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-gray-900 to-[#0a0a1a]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.1}%`,
            top: `${mousePosition.y * 0.1}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-emerald-400/5 to-yellow-500/5 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-500/5 to-emerald-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center relative z-10">
        {/* Left Side */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
          <div className="relative">
            {/* Glowing effect behind name */}
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/20 to-emerald-400/20 blur-xl animate-pulse" />
            
            <h1 className="relative text-5xl md:text-6xl font-bold font-serif bg-gradient-to-r from-yellow-500 via-yellow-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg animate-gradient bg-[length:200%_200%]">
              Keshav Rajput
            </h1>
          </div>
          
          <h2 className={`text-xl text-gray-400 mt-4 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Web Developer & Creative Builder
          </h2>
          
          <p className={`italic mt-6 text-lg text-gray-300 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Crafting timeless websites & digital experiences.
          </p>
          
          <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <a
              href="#projects"
              className="group inline-block mt-8 px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-yellow-500 to-emerald-400 text-[#0a0a1a] shadow-lg hover:shadow-yellow-500/25 hover:scale-110 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Explore My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* Floating Icons */}
          <div className="absolute -z-10 top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-10 right-10 w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
            <div className="absolute bottom-20 left-10 w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Right Side */}
        <div className={`flex justify-center transform transition-all duration-1000 delay-200 ${isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'}`}>
          <div className="relative group">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/30 to-emerald-400/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse" />
            
            {/* Main avatar container */}
            <div className="relative w-72 h-72 rounded-full p-2 bg-gradient-to-r from-yellow-500 to-emerald-400 shadow-2xl hover:shadow-yellow-500/30 transition-all duration-500 group-hover:scale-110 animate-gradient bg-[length:200%_200%]">
              <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-yellow-500 text-5xl font-bold relative overflow-hidden group">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <span className="relative z-10 transition-all duration-300 group-hover:text-emerald-400">
                  <img src={myimg} alt='my photo'></img>
                </span>
                
                {/* Rotating border */}
                <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-yellow-500/0 via-yellow-500/50 to-yellow-500/0 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            {/* Orbiting dots */}
            <div className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative w-full h-full animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-500 rounded-full -translate-x-1/2 animate-pulse" />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-emerald-400 rounded-full -translate-x-1/2 animate-pulse" />
                <div className="absolute left-0 top-1/2 w-2 h-2 bg-yellow-400 rounded-full -translate-y-1/2 animate-pulse" />
                <div className="absolute right-0 top-1/2 w-2 h-2 bg-emerald-500 rounded-full -translate-y-1/2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-sm">Scroll down</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}