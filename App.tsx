import { useScroll, useSpring, motion } from 'motion/react';
import { Navbar, Footer, StarsBackground } from './components/UI';
import Hero from './components/Hero';
import Work from './components/Work';
import { About, Services, Testimonials, Contact } from './components/AboutServicesContact';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <LanguageProvider>
      <div className="min-h-screen text-gray-200 selection:bg-white selection:text-black relative">
        <StarsBackground />
        <div className="film-grain z-[-1]"></div>
        
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50 mix-blend-screen shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ scaleX }}
        />

        <Navbar />
        
        <main className="relative z-10">
          <Hero />
          <Work />
          <About />
          <Services />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
