import { useState, useEffect, useRef } from 'react';

const experiences = [
  {
    title: "First Place – DCODE Hackathon",
    desc: "Developed a MERN‑based AI ranking model and led frontend integration to deliver a smooth and impactful user experience.",
    year: "Oct 2025",
    icon: "🥇",
    color: "from-amber-500 to-orange-600",
    bgColor: "from-amber-500/10 to-orange-600/10",
    achievement: "1st Place",
    participants: "Competitive Hackathon",
    category: "Competition"
  },
  {
    title: "Runner‑up – GDG Ideathon",
    desc: "Designed and pitched an innovative tech solution addressing real‑world challenges as part of the Google Developer Groups Ideathon.",
    year: "Jan 2025",
    icon: "🏆",
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-500/10 to-emerald-600/10",
    achievement: "2nd Place",
    participants: "GDG Event",
    category: "Competition"
  },
  {
    title: "Hacktoberfest Contributor",
    desc: "Contributed and merged multiple PRs to open‑source repositories, improving UI and API integration while collaborating with global developers.",
    year: "Oct 2024",
    icon: "🛠️",
    color: "from-blue-500 to-cyan-600",
    bgColor: "from-blue-500/10 to-cyan-600/10",
    achievement: "Multiple PRs",
    participants: "Global Open Source",
    category: "Open Source"
  },

];

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredExp, setHoveredExp] = useState(null);
  const [activeExp, setActiveExp] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [completedExperiences, setCompletedExperiences] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateTimeline();
          generateParticles();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Auto-progress through timeline
    const interval = setInterval(() => {
      setActiveExp((prev) => (prev + 1) % experiences.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const animateTimeline = () => {
    // Animate timeline progress
    let progress = 0;
    const animate = () => {
      progress += 2;
      if (progress <= 100) {
        setTimelineProgress(progress);
        requestAnimationFrame(animate);
      }
    };
    setTimeout(animate, 500);

    // Animate experiences one by one
    experiences.forEach((_, index) => {
      setTimeout(() => {
        setCompletedExperiences(prev => [...prev, index]);
      }, 800 + index * 600);
    });
  };

  const generateParticles = () => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['amber', 'green', 'blue', 'purple'][Math.floor(Math.random() * 4)],
      direction: Math.random() * 360
    }));
    setParticles(newParticles);
  };

  const renderExperiencePattern = (category, isActive, isHovered) => {
    const intensity = isActive || isHovered ? 'opacity-30' : 'opacity-15';
    const scale = isActive || isHovered ? 'scale-110' : 'scale-100';
    
    switch (category) {
      case 'Competition':
        return (
          <div className={`absolute inset-0 ${intensity} ${scale} transition-all duration-500`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 border-2 border-amber-400 rotate-45 animate-pulse"
                style={{
                  left: `${20 + (i % 3) * 30}%`,
                  top: `${25 + Math.floor(i / 3) * 50}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
        );
      case 'Open Source':
        return (
          <div className={`absolute inset-0 ${intensity} ${scale} transition-all duration-500`}>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(34,197,94,0.1)_49%,rgba(34,197,94,0.1)_51%,transparent_52%)] bg-[size:15px_15px] animate-pulse" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"
                style={{
                  left: `${15 + (i % 4) * 20}%`,
                  top: `${20 + Math.floor(i / 4) * 30}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        );
      case 'Education':
        return (
          <div className={`absolute inset-0 ${intensity} ${scale} transition-all duration-500`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="absolute border border-blue-400 animate-spin"
                style={{
                  left: `${25 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  width: `${8 + i * 2}px`,
                  height: `${8 + i * 2}px`,
                  animationDuration: `${2 + i * 0.5}s`,
                  borderRadius: i % 2 === 0 ? '50%' : '0%'
                }}
              />
            ))}
          </div>
        );
      case 'Learning':
        return (
          <div className={`absolute inset-0 ${intensity} ${scale} transition-all duration-500`}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-purple-400 animate-pulse"
                style={{
                  left: `${10 + (i % 6) * 15}%`,
                  top: `${20 + Math.floor(i / 6) * 60}%`,
                  width: '2px',
                  height: `${10 + Math.random() * 20}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="py-24 px-6 md:px-16 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Spectacular Background */}
      <div className="absolute inset-0">
        {/* Dynamic gradient following mouse */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(245,158,11,0.2) 0%, rgba(34,197,94,0.15) 25%, rgba(59,130,246,0.1) 50%, rgba(168,85,247,0.15) 75%, transparent 100%)`
          }}
        />
        
        {/* Floating achievement particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute rounded-full animate-float-achievement ${
              particle.color === 'amber' ? 'bg-amber-400' : 
              particle.color === 'green' ? 'bg-green-400' :
              particle.color === 'blue' ? 'bg-blue-400' : 'bg-purple-400'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.speed + 4}s`,
              animationDelay: `${particle.id * 0.1}s`
            }}
          />
        ))}

        {/* Achievement badges floating */}
        <div className="absolute top-20 right-20 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🏆</div>
        <div className="absolute bottom-32 left-16 text-3xl animate-pulse">⭐</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-spin" style={{ animationDuration: '8s' }}>🎯</div>
      </div>

      {/* Title with Epic Animation */}
      <div className="relative z-10 mb-20">
        <h2 className={`text-5xl md:text-6xl font-serif text-center relative transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
          <span className="relative inline-block">
            {/* Multi-layer glowing text */}
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent blur-sm animate-pulse">
              Journey & Achievements
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent blur-md opacity-50">
              Journey & Achievements
            </span>
            <span className="relative bg-gradient-to-r from-amber-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-achievement-glow bg-[length:400%_400%]">
              Journey & Achievements
            </span>
            
            {/* Dynamic underline */}
            <span className={`absolute bottom-0 left-1/2 h-2 bg-gradient-to-r from-amber-500 via-green-500 via-blue-500 to-purple-500 -translate-x-1/2 transition-all duration-1000 ${isVisible ? 'w-52' : 'w-0'} animate-achievement-glow bg-[length:400%_400%]`}></span>
          </span>
          
          {/* Achievement stats orbiting */}
          <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative w-full h-full animate-spin-achievement">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-500/20 px-4 py-2 rounded-full text-xs font-bold">2nd Place 🏆</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-green-500/20 px-4 py-2 rounded-full text-xs font-bold">25+ PRs 🔧</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-500/20 px-4 py-2 rounded-full text-xs font-bold">50+ Mentees 🎓</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-500/20 px-4 py-2 rounded-full text-xs font-bold">6+ Certs 📜</div>
            </div>
          </div>
        </h2>

        {/* Timeline progress indicator */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <div className="text-sm text-gray-400">2022</div>
          <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-green-500 via-blue-500 to-purple-500 transition-all duration-2000 animate-achievement-glow bg-[length:400%_400%]"
              style={{ width: `${timelineProgress}%` }}
            />
          </div>
          <div className="text-sm text-gray-400">2024</div>
        </div>
      </div>

      {/* Timeline with Mind-Blowing Effects */}
      <div className="relative pl-16 md:pl-20">
        {/* Main timeline line */}
        <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gray-700">
          <div 
            className="w-full bg-gradient-to-b from-amber-500 via-green-500 via-blue-500 to-purple-500 transition-all duration-2000 animate-achievement-glow bg-[length:400%_400%]"
            style={{ height: `${timelineProgress}%` }}
          />
        </div>

        {/* Pulsing timeline dots */}
        <div className="absolute left-6 md:left-10 top-0 bottom-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-500 to-emerald-400 rounded-full animate-ping"
              style={{
                top: `${i * 10 + 5}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>

        {/* Experience cards */}
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`relative mb-16 pl-8 md:pl-12 transform transition-all duration-1000 ${
              completedExperiences.includes(i)
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-20 opacity-0'
            } ${activeExp === i ? 'scale-105 z-20' : ''}`}
            style={{ 
              animationDelay: `${i * 600}ms`
            }}
            onMouseEnter={() => setHoveredExp(i)}
            onMouseLeave={() => setHoveredExp(null)}
          >
            {/* Timeline dot */}
            <div className={`absolute -left-8 md:-left-12 top-6 w-8 h-8 rounded-full bg-gradient-to-r ${exp.color} shadow-2xl flex items-center justify-center text-lg transform transition-all duration-500 ${
              hoveredExp === i || activeExp === i ? 'scale-125 animate-pulse' : completedExperiences.includes(i) ? 'scale-110' : ''
            }`}>
              {exp.icon}
            </div>

            {/* Connection line to card */}
            <div className={`absolute -left-4 md:left-0 top-8 w-8 md:w-12 h-0.5 bg-gradient-to-r ${exp.color} transition-all duration-500 ${completedExperiences.includes(i) ? 'opacity-100' : 'opacity-0'}`} />

            {/* Experience card */}
            <div className="group relative">
              {/* Outer glow effect */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${exp.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 ${activeExp === i ? 'opacity-20' : ''}`} />
              
              {/* Main card */}
              <div className={`relative bg-gray-900/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 group-hover:border-yellow-500/50 transition-all duration-500 overflow-hidden ${activeExp === i ? 'border-emerald-400/50' : ''}`}>
                {/* Card shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Dynamic background pattern */}
                {renderExperiencePattern(exp.category, activeExp === i, hoveredExp === i)}
                
                {/* Year badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${exp.bgColor} border border-gray-600 rounded-full text-xs font-bold transition-all duration-500 ${hoveredExp === i ? 'scale-110' : ''}`}>
                  {exp.year}
                </div>

                {/* Category tag */}
                <div className={`inline-block mb-4 px-3 py-1 bg-gradient-to-r ${exp.color} text-black rounded-full text-xs font-bold`}>
                  {exp.category}
                </div>
                
                {/* Title with spectacular animation */}
                <h3 className={`text-2xl font-serif mb-4 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent group-hover:from-yellow-500 group-hover:to-emerald-400 transition-all duration-500`}>
                  {exp.title}
                  {hoveredExp === i && <span className="animate-blink text-yellow-500 ml-1">|</span>}
                </h3>
                
                {/* Description */}
                <p className={`text-gray-300 mb-6 transition-all duration-500 ${hoveredExp === i ? 'text-white' : ''}`}>
                  {exp.desc}
                </p>
                
                {/* Achievement stats */}
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Achievement:</span>
                      <span className={`bg-gradient-to-r ${exp.color} bg-clip-text text-transparent font-bold`}>
                        {exp.achievement}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Scale:</span>
                      <span className={`bg-gradient-to-r ${exp.color} bg-clip-text text-transparent font-bold`}>
                        {exp.participants}
                      </span>
                    </div>
                  </div>
                  
                  {/* Impact meter */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${exp.bgColor} border-4 border-gray-700 flex items-center justify-center text-2xl transform transition-all duration-500 ${hoveredExp === i ? 'scale-110 rotate-12' : ''}`}>
                    {exp.icon}
                  </div>
                </div>

                {/* Interactive hover elements */}
                {hoveredExp === i && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 15 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                        style={{
                          left: `${10 + (idx % 5) * 20}%`,
                          top: `${15 + Math.floor(idx / 5) * 25}%`,
                          animationDelay: `${idx * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement summary */}
      <div className={`text-center mt-20 transform transition-all duration-1000 delay-2000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-green-500/5 via-blue-500/5 to-purple-500/5 animate-achievement-glow bg-[length:400%_400%]" />
         <h3 className="relative text-3xl font-bold bg-gradient-to-r from-yellow-500 to-emerald-400 bg-clip-text text-transparent mb-4">
  Ready to Join Your Team? 🚀
</h3>
<p className="relative text-gray-300 mb-6">
  These hackathons, open‑source contributions, and simulations reflect how I learn fast and deliver under pressure. I&apos;m excited to bring this energy to a full‑time or internship role.
</p>
<a href="mailto:keshavraj9954@gmail.com">
  <button className="relative group px-12 py-4 bg-gradient-to-r from-amber-500 via-green-500 via-blue-500 to-purple-500 rounded-full font-bold text-black text-lg overflow-hidden transform hover:scale-110 transition-all duration-300 animate-achievement-glow bg-[length:400%_400%]">
    <span className="relative z-10">Hire Me</span>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </button>
</a>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-achievement {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-12px) translateX(8px) rotate(90deg); }
          50% { transform: translateY(0px) translateX(15px) rotate(180deg); }
          75% { transform: translateY(12px) translateX(8px) rotate(270deg); }
        }
        
        @keyframes achievement-glow {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 25% 50%; }
          50% { background-position: 50% 50%; }
          75% { background-position: 75% 50%; }
        }
        
        @keyframes spin-achievement {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-float-achievement { animation: float-achievement 6s ease-in-out infinite; }
        .animate-achievement-glow { animation: achievement-glow 5s ease infinite; }
        .animate-spin-achievement { animation: spin-achievement 25s linear infinite; }
        .animate-blink { animation: blink 1s step-start infinite; }
      `}</style>
    </section>
  );
}