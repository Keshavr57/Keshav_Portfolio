import { useState, useEffect, useRef } from 'react';

const skills = [
  {
    icon: "⚛️",
    title: "Frontend Development",
    desc: "React.js, HTML, CSS, JavaScript, TypeScript, Responsive Design",
    color: "from-blue-500 to-cyan-400",
    bgColor: "from-blue-500/10 to-cyan-400/10",
    level: 92,
    experience: "2+ years",
    projects: 8,
    pattern: "react"
  },
  {
    icon: "🚀",
    title: "Backend Development",
    desc: "Node.js, Express.js, RESTful APIs, JWT Authentication, Server Architecture",
    color: "from-emerald-500 to-green-400",
    bgColor: "from-emerald-500/10 to-green-400/10",
    level: 88,
    experience: "2+ years",
    projects: 6,
    pattern: "server"
  },
  {
    icon: "🗄️",
    title: "Database Management",
    desc: "MongoDB, PostgreSQL, Database Design, Data Modeling, Query Optimization",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/10 to-pink-500/10",
    level: 85,
    experience: "1.5+ years",
    projects: 5,
    pattern: "cloud"
  },
  {
    icon: "🛠️",
    title: "Development Tools",
    desc: "Git & GitHub, VS Code, Postman, npm/yarn, Debugging, Testing",
    color: "from-orange-500 to-yellow-400",
    bgColor: "from-orange-500/10 to-yellow-400/10",
    level: 90,
    experience: "2+ years",
    projects: 10,
    pattern: "design"
  }
];

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = useState(0);
  const [skillLevels, setSkillLevels] = useState(skills.map(() => 0));
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateSkillBars();
          generateParticles();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Auto-rotate active skill
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
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

  const animateSkillBars = () => {
    skills.forEach((skill, index) => {
      setTimeout(() => {
        let current = 0;
        const target = skill.level;
        const increment = target / 100;
        
        const animate = () => {
          current += increment * 2;
          if (current < target) {
            setSkillLevels(prev => {
              const newLevels = [...prev];
              newLevels[index] = Math.min(current, target);
              return newLevels;
            });
            requestAnimationFrame(animate);
          } else {
            setSkillLevels(prev => {
              const newLevels = [...prev];
              newLevels[index] = target;
              return newLevels;
            });
          }
        };
        animate();
      }, index * 200);
    });
  };

  const generateParticles = () => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['blue', 'green', 'pink', 'orange'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);
  };

  const renderSkillPattern = (pattern, isActive, isHovered) => {
    const intensity = isActive || isHovered ? 'opacity-30' : 'opacity-10';
    const scale = isActive || isHovered ? 'scale-110' : 'scale-100';
    
    switch (pattern) {
      case 'react':
        return (
          <div className={`absolute inset-0 ${intensity} ${scale} transition-all duration-500`}>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-2 border-blue-400 rounded-full animate-spin"
                  style={{
                    animationDuration: `${2 + i}s`,
                    transform: `rotate(${i * 60}deg)`,
                    transformOrigin: 'center'
                  }}
                />
              ))}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        );
      case 'server':
        return (
          <div className={`absolute inset-0 ${intensity} ${scale} transition-all duration-500`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-green-400 animate-pulse"
                style={{
                  left: `${20 + (i % 3) * 25}%`,
                  top: `${30 + Math.floor(i / 3) * 40}%`,
                  width: '20px',
                  height: '4px',
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
        );
      case 'design':
        return (
          <div className={`absolute inset-0 ${intensity} ${scale} transition-all duration-500`}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 border border-pink-400 animate-ping"
                style={{
                  left: `${15 + (i % 4) * 20}%`,
                  top: `${20 + Math.floor(i / 4) * 30}%`,
                  animationDelay: `${i * 0.2}s`,
                  borderRadius: i % 2 === 0 ? '50%' : '0%'
                }}
              />
            ))}
          </div>
        );
      case 'cloud':
        return (
          <div className={`absolute inset-0 ${intensity} ${scale} transition-all duration-500`}>
            <div className="absolute top-1/4 left-1/4 w-12 h-8 bg-orange-400/30 rounded-full animate-float" />
            <div className="absolute top-1/3 right-1/4 w-8 h-6 bg-yellow-400/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-10 h-6 bg-orange-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-24 px-6 md:px-16 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Spectacular Background */}
      <div className="absolute inset-0">
        {/* Mouse-following gradient */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59,130,246,0.2) 0%, rgba(16,185,129,0.1) 25%, rgba(236,72,153,0.1) 50%, rgba(251,146,60,0.1) 75%, transparent 100%)`
          }}
        />
        
        {/* Floating skill particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute rounded-full animate-float-skill ${
              particle.color === 'blue' ? 'bg-blue-400' : 
              particle.color === 'green' ? 'bg-green-400' :
              particle.color === 'pink' ? 'bg-pink-400' : 'bg-orange-400'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.speed + 3}s`,
              animationDelay: `${particle.id * 0.1}s`
            }}
          />
        ))}

        {/* Skill level visualization */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full border-4 border-yellow-500/20 animate-spin-slow">
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Title with Mind-Blowing Effects */}
      <div className="relative z-10 mb-20">
        <h2 className={`text-5xl md:text-6xl font-serif text-center relative transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
          <span className="relative inline-block">
            {/* Multi-layer glowing text */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent blur-sm animate-pulse">
              Skills & Expertise
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent blur-md opacity-50">
              Skills & Expertise
            </span>
            <span className="relative bg-gradient-to-r from-blue-500 via-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-rainbow bg-[length:400%_400%]">
              Skills & Expertise
            </span>
            
            {/* Dynamic underline */}
            <span className={`absolute bottom-0 left-1/2 h-2 bg-gradient-to-r from-blue-500 via-green-500 via-pink-500 to-orange-500 -translate-x-1/2 transition-all duration-1000 ${isVisible ? 'w-48' : 'w-0'} animate-rainbow bg-[length:400%_400%]`}></span>
          </span>
          
          {/* Skill icons orbiting */}
          <div className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative w-full h-full animate-spin-very-slow">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`absolute text-3xl transition-all duration-500 ${activeSkill === index ? 'scale-150 animate-bounce' : ''}`}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-120px) rotate(-${index * 90}deg)`
                  }}
                >
                  {skill.icon}
                </div>
              ))}
            </div>
          </div>
        </h2>

        {/* Skill level indicator */}
        <div className="flex justify-center items-center space-x-8 mt-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`flex flex-col items-center transition-all duration-500 ${activeSkill === index ? 'scale-125' : ''}`}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-2xl ${activeSkill === index ? 'animate-pulse' : ''}`}>
                {skill.icon}
              </div>
              <div className={`mt-2 w-20 h-1 bg-gray-700 rounded-full overflow-hidden ${activeSkill === index ? 'bg-gray-600' : ''}`}>
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                  style={{ width: `${skillLevels[index]}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 mt-1">{skillLevels[index].toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Cards with Explosive Effects */}
      <div className="grid md:grid-cols-4 gap-8 relative z-10">
        {skills.map((skill, i) => (
          <div
            key={i}
            className={`group relative transform transition-all duration-700 ${
              isVisible 
                ? `translate-y-0 opacity-100` 
                : 'translate-y-20 opacity-0'
            } ${activeSkill === i ? 'scale-110 z-20' : ''}`}
            style={{ 
              animationDelay: `${i * 200}ms`,
              transform: hoveredSkill === i ? 'translateY(-15px) rotateX(10deg) rotateY(5deg)' : undefined
            }}
            onMouseEnter={() => setHoveredSkill(i)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Outer glow effect */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${skill.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 ${activeSkill === i ? 'opacity-30' : ''}`} />
            
            {/* Main card */}
            <div className={`relative bg-gray-900/90 backdrop-blur-sm p-8 rounded-2xl text-center border border-gray-700/30 group-hover:border-emerald-400/50 transition-all duration-500 overflow-hidden ${activeSkill === i ? 'border-yellow-500/50' : ''}`}>
              {/* Card shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Dynamic background pattern */}
              {renderSkillPattern(skill.pattern, activeSkill === i, hoveredSkill === i)}
              
              {/* Skill icon with spectacular animation */}
              <div className="relative mb-6">
                <div className={`text-6xl transform transition-all duration-500 ${hoveredSkill === i ? 'scale-125 rotate-12' : activeSkill === i ? 'scale-110 animate-pulse' : ''} animate-float`}>
                  {skill.icon}
                </div>
                
                {/* Icon glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.bgColor} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                
                {/* Skill level circle */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-emerald-400 flex items-center justify-center text-black text-xs font-bold">
                  {skill.level}%
                </div>
              </div>
              
              {/* Title with color animation */}
              <h3 className={`text-2xl font-semibold mb-3 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent group-hover:from-yellow-500 group-hover:to-emerald-400 transition-all duration-500`}>
                {skill.title}
                {hoveredSkill === i && <span className="animate-blink text-yellow-500 ml-1">|</span>}
              </h3>
              
              {/* Description with reveal effect */}
              <p className={`text-gray-300 mb-4 transition-all duration-500 ${hoveredSkill === i ? 'text-white' : ''}`}>
                {skill.desc}
              </p>
              
              {/* Skill stats */}
              <div className={`space-y-2 transition-all duration-500 ${hoveredSkill === i ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-2'}`}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Experience</span>
                  <span className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent font-semibold`}>
                    {skill.experience}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Projects</span>
                  <span className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent font-semibold`}>
                    {skill.projects}+
                  </span>
                </div>
              </div>

              {/* Interactive hover elements */}
              {hoveredSkill === i && (
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                      style={{
                        left: `${10 + (idx % 4) * 25}%`,
                        top: `${15 + Math.floor(idx / 4) * 25}%`,
                        animationDelay: `${idx * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Skill mastery bar */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-800">
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ${hoveredSkill === i ? 'h-3' : ''}`}
                  style={{ width: `${skillLevels[i]}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom showcase */}
      <div className={`text-center mt-20 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-green-500/5 via-pink-500/5 to-orange-500/5 animate-rainbow bg-[length:400%_400%]" />
<h3 className="relative text-2xl font-bold bg-gradient-to-r from-yellow-500 to-emerald-400 bg-clip-text text-transparent mb-4">
  Open to SDE / Full‑Stack Opportunities
</h3>
<p className="relative text-gray-300 mb-6">
  If you&apos;re looking for a developer who can own features end‑to‑end across React, Node.js, and PostgreSQL, I&apos;d love to work with you.
</p>
<button 
  onClick={() => {
    // Scroll to contact form
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Show notification
    setTimeout(() => {
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
      notification.textContent = 'Please fill the contact form below to hire me!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }, 500);
  }}
  className="relative group px-12 py-4 bg-gradient-to-r from-yellow-500 via-emerald-400 to-pink-500 rounded-full font-bold text-black text-lg overflow-hidden transform hover:scale-110 transition-all duration-300 animate-rainbow bg-[length:400%_400%] cursor-pointer"
>
  <span className="relative z-10">Hire Me</span>
  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
</button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-skill {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-10px) translateX(5px) rotate(90deg); }
          50% { transform: translateY(0px) translateX(10px) rotate(180deg); }
          75% { transform: translateY(10px) translateX(5px) rotate(270deg); }
        }
        
        @keyframes rainbow {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 25% 50%; }
          50% { background-position: 50% 50%; }
          75% { background-position: 75% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-float-skill { animation: float-skill 5s ease-in-out infinite; }
        .animate-rainbow { animation: rainbow 4s ease infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-very-slow { animation: spin-very-slow 30s linear infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-blink { animation: blink 1s step-start infinite; }
      `}</style>
    </section>
  );
}