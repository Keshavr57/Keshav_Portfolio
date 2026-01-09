import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Eye, Star, Award, Code, Briefcase } from 'lucide-react';

export default function Resume() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          generateParticles();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
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

  const generateParticles = () => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['blue', 'purple', 'green', 'yellow'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = '/Resume-Keshav Rajput (10).pdf'; // Your actual resume file
    link.download = 'Resume-Keshav Rajput (10).pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const handlePreview = () => {
    window.open('/Keshav_Rajput_Resume.pdf', '_blank');
  };

  const resumeHighlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Technical Skills",
      desc: "MERN Stack, JavaScript, TypeScript, MongoDB, PostgreSQL",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Achievements",
      desc: "1st Place DCODE Hackathon, Runner-up GDG Ideathon",
      color: "from-yellow-500 to-orange-400"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Projects",
      desc: "SuperStock, Aivora AI, CompareX - Full-Stack Applications",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Education",
      desc: "B.Tech Computer Science - Rishihood University",
      color: "from-purple-500 to-pink-400"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="resume" 
      className="py-24 px-6 md:px-16 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59,130,246,0.3) 0%, rgba(168,85,247,0.2) 30%, rgba(34,197,94,0.15) 60%, transparent 100%)`
          }}
        />
        
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute rounded-full animate-float-resume ${
              particle.color === 'blue' ? 'bg-blue-400' : 
              particle.color === 'purple' ? 'bg-purple-400' :
              particle.color === 'green' ? 'bg-green-400' : 'bg-yellow-400'
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

        <div className="absolute top-20 right-20 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>📄</div>
        <div className="absolute bottom-32 left-16 text-3xl animate-pulse">⭐</div>
        <div className="absolute top-1/3 left-1/4 text-3xl animate-spin" style={{ animationDuration: '8s' }}>💼</div>
      </div>

      {/* Title */}
      <motion.div 
        className="relative z-10 mb-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl md:text-6xl font-serif relative">
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent blur-sm animate-pulse">
              Download My Resume
            </span>
            <span className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent animate-resume-glow bg-[length:300%_300%]">
              Download My Resume
            </span>
          </span>
        </h2>
        
        <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
          Get a comprehensive overview of my skills, experience, and achievements in a professionally formatted document.
        </p>
      </motion.div>

      {/* Resume Preview Card */}
      <motion.div 
        className="relative max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="group relative">
          <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
          
          <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/30 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 p-8 border-b border-gray-700/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      Keshav Rajput
                    </h3>
                    <p className="text-gray-400">Full-Stack Developer & Problem Solver</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    onClick={handlePreview}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-5 h-5" />
                    <span>Preview</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="relative flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white overflow-hidden transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-green-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 flex items-center space-x-2">
                      {isDownloading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          <span>Download PDF</span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Resume Highlights */}
            <div className="p-8">
              <h4 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                What's Inside My Resume
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                {resumeHighlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="group relative p-6 bg-gray-800/50 rounded-xl border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${highlight.color} rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                    
                    <div className="relative flex items-start space-x-4">
                      <div className={`p-3 bg-gradient-to-r ${highlight.color} rounded-lg text-white`}>
                        {highlight.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-2">{highlight.title}</h5>
                        <p className="text-gray-400 text-sm">{highlight.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-8 text-center border-t border-gray-700/30">
              <p className="text-gray-300 mb-4">
                Ready to see the full picture? Download my resume to learn more about my journey and technical expertise.
              </p>
              
              <div className="flex justify-center items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <FileText className="w-4 h-4" />
                  <span>PDF Format</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Download className="w-4 h-4" />
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Star className="w-4 h-4" />
                  <span>Updated 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes float-resume {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-10px) translateX(5px) rotate(90deg); }
          50% { transform: translateY(0px) translateX(10px) rotate(180deg); }
          75% { transform: translateY(10px) translateX(5px) rotate(270deg); }
        }
        
        @keyframes resume-glow {
          0%, 100% { background-position: 0% 50%; }
          33% { background-position: 33% 50%; }
          66% { background-position: 66% 50%; }
        }
        
        .animate-float-resume { animation: float-resume 4s ease-in-out infinite; }
        .animate-resume-glow { animation: resume-glow 3s ease infinite; }
      `}</style>
    </section>
  );
}