import { useState, useEffect, useRef } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [typingIndicators, setTypingIndicators] = useState({});
  const [formProgress, setFormProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
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

  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.trim().length > 0).length;
    const progress = (filledFields / fields.length) * 100;
    setFormProgress(progress);
  }, [formData]);

  const generateParticles = () => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['yellow', 'emerald', 'blue', 'purple'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    setTypingIndicators(prev => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setTypingIndicators(prev => ({ ...prev, [field]: false }));
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitSuccess(false);
      setFormProgress(0);
    }, 3000);
  };

  const getFieldIcon = (field) => {
    const icons = {
      name: '👤',
      email: '📧',
      subject: '💡',
      message: '💬'
    };
    return icons[field] || '📝';
  };

  const getFieldColor = (field) => {
    const colors = {
      name: 'from-blue-500 to-cyan-400',
      email: 'from-purple-500 to-pink-400', 
      subject: 'from-orange-500 to-yellow-400',
      message: 'from-green-500 to-emerald-400'
    };
    return colors[field] || 'from-yellow-500 to-emerald-400';
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 px-6 md:px-16 max-w-4xl mx-auto relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(234,179,8,0.3) 0%, rgba(16,185,129,0.2) 30%, rgba(168,85,247,0.15) 60%, transparent 100%)`
          }}
        />
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute rounded-full animate-float-contact ${
              particle.color === 'yellow' ? 'bg-yellow-400' : 
              particle.color === 'emerald' ? 'bg-emerald-400' :
              particle.color === 'blue' ? 'bg-blue-400' : 'bg-purple-400'
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
        <div className="absolute top-20 left-20 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>📧</div>
        <div className="absolute bottom-32 right-16 text-3xl animate-pulse">💬</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-spin" style={{ animationDuration: '8s' }}>🚀</div>
      </div>

      {/* Title */}
      <div className="relative z-10 mb-16 text-center">
        <h2 className={`text-5xl md:text-6xl font-serif transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-emerald-400 to-purple-500 bg-clip-text text-transparent blur-sm animate-pulse">
              Let's Create Together
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-emerald-400 to-purple-500 bg-clip-text text-transparent blur-md opacity-50">
              Let's Create Together
            </span>
            <span className="relative bg-gradient-to-r from-yellow-500 via-emerald-400 to-purple-500 bg-clip-text text-transparent animate-contact-glow bg-[length:300%_300%]">
              Let's Create Together
            </span>
          </span>
        </h2>

        {/* Form Progress */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <span className="text-sm text-gray-400">Form Progress</span>
          <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 to-emerald-400 transition-all duration-500 animate-contact-glow bg-[length:300%_300%]"
              style={{ width: `${formProgress}%` }}
            />
          </div>
          <span className="text-sm text-emerald-400 font-bold">{Math.round(formProgress)}%</span>
        </div>
      </div>

      {/* Form */}
      <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="relative group">
          <div className="absolute -inset-8 bg-gradient-to-r from-yellow-500/20 via-emerald-400/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
          
          {submitSuccess && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/90 to-emerald-400/90 rounded-2xl flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                <p className="text-green-100">I'll get back to you within 24 hours</p>
              </div>
            </div>
          )}

          <form 
            onSubmit={handleSubmit}
            className="relative bg-gray-900/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-700/30 shadow-2xl space-y-8 overflow-hidden"
          >
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              {['name', 'email'].map(field => (
                <div key={field} className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${getFieldColor(field)} rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-500 ${focusedField === field ? 'opacity-50' : ''}`} />
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl z-10">{getFieldIcon(field)}</div>
                    <input 
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field === 'name' ? 'Your Name' : 'Your Email'}
                      required
                      value={formData[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      onFocus={() => setFocusedField(field)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 text-gray-100 placeholder-gray-400 transition-all duration-500 hover:bg-gray-700/50" 
                    />
                    {typingIndicators[field] && (
                      <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-${field==='name'?'emerald':'purple'}-400 animate-pulse`}>
                        ✨
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Subject */}
            <div className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r ${getFieldColor('subject')} rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-500 ${focusedField === 'subject' ? 'opacity-50' : ''}`} />
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl z-10">{getFieldIcon('subject')}</div>
                <input 
                  type="text"
                  placeholder="Project Subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 text-gray-100 placeholder-gray-400 transition-all duration-500 hover:bg-gray-700/50" 
                />
                {typingIndicators.subject && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400 animate-pulse">✨</div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r ${getFieldColor('message')} rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-500 ${focusedField === 'message' ? 'opacity-50' : ''}`} />
              <div className="relative">
                <div className="absolute left-4 top-6 text-xl z-10">{getFieldIcon('message')}</div>
                <textarea 
                  placeholder="Tell me about your project vision..." 
                  required 
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 text-gray-100 placeholder-gray-400 transition-all duration-500 hover:bg-gray-700/50 resize-none"
                />
                {typingIndicators.message && (
                  <div className="absolute right-4 top-6 text-emerald-400 animate-pulse">✨</div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="relative">
              <button 
                type="submit"
                disabled={isSubmitting || formProgress < 75}
                className="relative w-full py-4 px-8 rounded-lg font-bold text-lg overflow-hidden transform hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-emerald-400 animate-contact-glow bg-[length:300%_300%]" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/50 to-emerald-400/50 rounded-lg blur-xl opacity-0 hover:opacity-100 transition-all duration-500" />
                
                <span className="relative z-10 text-black flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="text-xl">🚀</span>
                    </>
                  )}
                </span>
              </button>
              {formProgress < 75 && (
                <p className="text-center text-gray-400 text-sm mt-2">
                  Complete at least 75% of the form to send message
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
              <div className="text-sm text-gray-400">
                Fields completed: <span className="text-emerald-400 font-bold">{Object.values(formData).filter(v => v.trim().length > 0).length}/4</span>
              </div>
              <div className="text-sm text-gray-400">
                Response time: <span className="text-yellow-400 font-bold">{"<"} 24 hours</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-contact {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(10px) rotate(90deg); }
          50% { transform: translateY(0px) translateX(20px) rotate(180deg); }
          75% { transform: translateY(15px) translateX(10px) rotate(270deg); }
        }
        
        @keyframes contact-glow {
          0%, 100% { background-position: 0% 50%; }
          33% { background-position: 33% 50%; }
          66% { background-position: 66% 50%; }
        }
        
        @keyframes spin-contact {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float-contact { animation: float-contact 5s ease-in-out infinite; }
        .animate-contact-glow { animation: contact-glow 4s ease infinite; }
        .animate-spin-contact { animation: spin-contact 20s linear infinite; }
      `}</style>
    </section>
  ); 
}
