import { useState, useEffect, useRef } from "react";

const projects = [
  {
    title: "SmartStock",
    desc: "A comprehensive stock market analysis platform with real-time data visualization and risk decision-making tools for investors. Built with MERN stack and integrated financial APIs.",
    video: "/SmartStock.mp4", // Using available video as placeholder
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Financial APIs", "Chart.js"],
    color: "from-blue-500 to-cyan-600",
    bgPattern: "finance",
    stats: { users: "500+", trades: "2.5K", uptime: "99.9%" },
    url: "https://smart-stock-ku3d.vercel.app/",
    type: "external",
  },
  {
    title: "Aivora AI",
    desc: "AI-powered content generation platform with advanced natural language processing. Features include article generation, content optimization, and multi-format export capabilities.",
    video: "/AivoraAi.mp4",
    tags: ["React", "Node.js", "OpenAI API", "MongoDB", "JWT", "Tailwind CSS"],
    color: "from-purple-500 to-pink-600",
    bgPattern: "ai",
    stats: { content: "10K+", users: "1.2K", accuracy: "95%" },
    url: "https://quick-ai-76zu.vercel.app/",
    type: "external",
  },
  {
    title: "CompareX",
    desc: "Full-stack product comparison platform enabling users to compare specifications, prices, and reviews across multiple categories with intelligent recommendation system.",
    video: "/comparex.mp4",
    tags: ["React", "Node.js", "Express.js", "PostgreSQL", "REST APIs", "Responsive Design"],
    color: "from-green-500 to-emerald-600",
    bgPattern: "comparison",
    stats: { products: "5K+", comparisons: "15K", categories: "20+" },
    url: "https://compare-x.vercel.app/",
    type: "external",
  },
];

export default function FeaturedProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentShowcase, setCurrentShowcase] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShowcase((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 px-6 md:px-16 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Title */}
      <div className="relative z-10 mb-20">
        <h2
          className={`text-5xl md:text-6xl font-serif text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
          }`}
        >
          Featured Projects
        </h2>

        {/* Showcase Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                currentShowcase === index
                  ? "bg-gradient-to-r from-yellow-500 to-emerald-400 scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`group relative transform transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            } ${currentShowcase === i ? "scale-105 z-20" : "hover:scale-105"}`}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Outer glow */}
            <div
              className={`absolute -inset-4 bg-gradient-to-r ${project.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
            />

            {/* Main Card */}
            <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/30 group-hover:border-yellow-500/50 transition-all duration-500 overflow-hidden">
              {/* Video Preview */}
              <div className="relative h-56 rounded-t-2xl overflow-hidden">
                {project.video && (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                      hoveredCard === i ? "scale-105" : "scale-100"
                    }`}
                  />
                )}

                {/* Stats overlay */}
                <div
                  className={`absolute top-4 right-4 space-y-1 transition-all duration-500 ${
                    hoveredCard === i
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                >
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs text-emerald-400"
                    >
                      <span className="font-semibold">{value}</span> {key}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 relative">
                <h3 className="text-2xl font-serif mb-3 bg-gradient-to-r from-yellow-500 to-emerald-400 bg-clip-text text-transparent group-hover:from-emerald-400 group-hover:to-pink-500 transition-all duration-500">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-emerald-400/20 text-emerald-400 rounded-full text-sm border border-emerald-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  {project.type === "external" ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2 px-4 text-center bg-gradient-to-r from-yellow-500 to-emerald-400 text-black font-semibold rounded-lg hover:from-emerald-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
                    >
                      View Project →
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        document
                          .querySelector(project.url)
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-emerald-400 text-black font-semibold rounded-lg hover:from-emerald-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
                    >
                      View Project →
                    </button>
                  )}
                </div>
              </div>

              {/* Card number */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-yellow-500 to-emerald-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                {i + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
