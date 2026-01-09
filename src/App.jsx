import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}
