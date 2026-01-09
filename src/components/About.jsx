import { useState, useEffect, useRef } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);

const paragraphs = [
  "I am a Full Stack Developer specializing in the MERN stack, with experience building scalable systems and end-to-end applications. Two-time hackathon winner with strong focus on secure, reliable, and user-focused solutions. Currently pursuing B.Tech in Computer Science at Rishihood University & Newton School of Technology.",
  "I have hands-on experience with React.js, Node.js, Express.js, MongoDB, PostgreSQL, and modern development tools. I've built projects like SuperStock (a stock market analysis platform), Aivora AI (content generation tool), and CompareX (product comparison platform). My technical expertise spans across frontend frameworks, backend APIs, database design, and cloud deployment.",
  "I actively solve algorithmic problems on LeetCode (120+ problems solved) and contribute to open-source projects. I'm passionate about creating efficient, user-friendly applications and am currently seeking full-stack developer opportunities where I can contribute to meaningful projects and continue growing as a developer."
];

const skills = [
  'JavaScript',
  'TypeScript', 
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'PostgreSQL',
  'HTML/CSS',
  'Tailwind CSS',
  'Git & GitHub',
  'RESTful APIs',
  'JWT Authentication'
];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startTypingAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      direction: Math.random() * 360
    }));
    setParticles(newParticles);

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

  const startTypingAnimation = () => {
    let currentText = '';
    let paragraphIndex = 0;
    let charIndex = 0;

    const typeText = () => {
      if (paragraphIndex < paragraphs.length) {
        if (charIndex < paragraphs[paragraphIndex].length) {
          currentText += paragraphs[paragraphIndex][charIndex];
          setTypingText(currentText);
          charIndex++;
          setTimeout(typeText, 30);
        } else {
          setCurrentParagraph(paragraphIndex);
          paragraphIndex++;
          charIndex = 0;
          currentText += '\n\n';
          setTimeout(typeText, 500);
        }
      }
    };
    setTimeout(typeText, 1000);
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 px-6 md:px-16 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic Gradient Background */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(234,179,8,0.1) 0%, rgba(16,185,129,0.05) 50%, transparent 100%)`
          }}
        />
        
        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-yellow-500/20 to-emerald-400/20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.speed + 3}s`,
              animationDelay: `${particle.id * 0.1}s`
            }}
          />
        ))}

        {/* Geometric Shapes */}
        <div className="absolute top-20 right-10 w-20 h-20 border-2 border-yellow-500/30 rotate-45 animate-pulse" />
        <div className="absolute bottom-32 left-16 w-16 h-16 bg-gradient-to-r from-emerald-400/20 to-yellow-500/20 rounded-full animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border border-emerald-400/30 animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      {/* Title with Spectacular Animation */}
      <div className="relative z-10">
        <h2 className={`text-4xl md:text-5xl font-serif text-center mb-16 relative transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <span className="relative inline-block">
            {/* Glowing text effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-emerald-400 bg-clip-text text-transparent blur-sm">
              About Me
            </span>
            <span className="relative bg-gradient-to-r from-yellow-500 to-emerald-400 bg-clip-text text-transparent">
              About Me
            </span>
            
            {/* Animated underline */}
            <span className={`absolute bottom-0 left-1/2 h-1 bg-gradient-to-r from-yellow-500 to-emerald-400 -translate-x-1/2 transition-all duration-1000 ${isVisible ? 'w-32' : 'w-0'}`}></span>
          </span>
          
          {/* Floating icons around title */}
          <div className="absolute -top-4 -right-4 text-yellow-500 animate-bounce" style={{ animationDuration: '2s' }}>✨</div>
          <div className="absolute -bottom-4 -left-4 text-emerald-400 animate-pulse">⚡</div>
        </h2>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Text Content with Typewriter Effect */}
          <div className={`md:col-span-2 space-y-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            {paragraphs.map((paragraph, index) => (
              <div
                key={index}
                className={`relative text-lg leading-relaxed transition-all duration-500 ${
                  currentParagraph >= index ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'
                }`}
              >
                {/* Glowing effect for active paragraph */}
                {currentParagraph === index && (
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/10 to-emerald-400/10 rounded-lg blur-xl animate-pulse" />
                )}
                
                <p className="relative z-10 p-4 rounded-lg backdrop-blur-sm bg-gray-900/20 border border-gray-700/30 hover:border-yellow-500/30 transition-all duration-300">
                  {paragraph}
                </p>
                
                {/* Typing cursor for current paragraph */}
                {currentParagraph === index && (
                  <span className="animate-blink text-yellow-500 ml-1">|</span>
                )}
              </div>
            ))}

            {/* Skills Animation */}
            <div className={`mt-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-xl font-semibold mb-6 text-emerald-400">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-emerald-400/10 border border-yellow-500/30 text-sm font-medium hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 cursor-default transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: isVisible ? `slideIn 0.5s ease-out ${index * 100}ms both` : 'none'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Creative Code Visualization */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-6'}`}>
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/30 to-emerald-400/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse" />
              
              {/* Main container */}
              <div className="relative h-80 bg-gradient-to-br from-yellow-500/10 to-emerald-400/10 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl border border-gray-700/30 backdrop-blur-sm overflow-hidden group-hover:scale-105 transition-all duration-500">
                {/* Code rain effect */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-xs text-green-400/30 font-mono animate-rain"
                      style={{
                        left: `${i * 10}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '3s'
                      }}
                    >
                      {'{code}'}
                    </div>
                  ))}
                </div>

                {/* Central content */}
                <div className="relative z-10 space-y-4">
                  <div className="text-6xl animate-bounce" style={{ animationDuration: '2s' }}>⚡</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-emerald-400 bg-clip-text text-transparent">
                    Full Stack Developer
                  </div>
                  <div className="text-sm text-gray-400 max-w-xs">
                    Building scalable applications with modern technologies
                  </div>
                  
                  {/* Binary background */}
                  <div className="absolute inset-0 opacity-5 text-xs font-mono text-white overflow-hidden">
                    <div className="animate-scroll">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <span key={i}>
                          {Math.random() > 0.5 ? '1' : '0'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes slideIn {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes rain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes scroll {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-blink { animation: blink 1s step-start infinite; }
        .animate-rain { animation: rain 3s linear infinite; }
        .animate-scroll { animation: scroll 10s linear infinite; }
      `}</style>
    </section>
  );
}