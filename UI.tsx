import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const FadeIn = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StarsBackground = () => (
  <div className="fixed inset-0 z-[-2] pointer-events-none bg-black">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black opacity-80"></div>
    <video
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover opacity-50 mix-blend-screen grayscale"
      src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90"></div>
  </div>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', check);
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="font-display font-bold text-xl tracking-tighter flex items-center gap-2 cursor-pointer pt-1" onClick={() => window.scrollTo(0,0)}>
          <span className="w-3 h-3 bg-white inline-block animate-pulse rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
          7ENNTOS
        </div>
        <nav className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase text-gray-400 pt-1">
          <a href="#work" className="hover:text-white transition-colors hover:scale-105 inline-block">{t.navbar.work}</a>
          <a href="#about" className="hover:text-white transition-colors hover:scale-105 inline-block">{t.navbar.about}</a>
          <a href="#services" className="hover:text-white transition-colors hover:scale-105 inline-block">{t.navbar.services}</a>
          <a href="#contact" className="hover:text-white transition-colors hover:scale-105 inline-block">{t.navbar.contact}</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="#contact" className="text-xs font-bold font-mono border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors rounded-sm uppercase tracking-wider hidden sm:inline-block">
            {t.navbar.letsTalk}
          </a>
        </div>
      </div>
    </header>
  );
}

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const { t } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const baseVisitors = 12458;
    const stored = localStorage.getItem('site_visitors');
    
    if (stored) {
      setVisitors(parseInt(stored, 10));
    } else {
      const newCount = baseVisitors + Math.floor(Math.random() * 50);
      localStorage.setItem('site_visitors', newCount.toString());
      setVisitors(newCount);
    }
  }, []);

  const setVisitors = (count: number) => {
    setVisitorCount(count);
  };

  return (
    <footer className="py-12 border-t border-white/10 text-center text-sm font-mono text-gray-500 bg-black relative">
      <div className="flex flex-col items-center justify-center gap-4">
        <p>© {new Date().getFullYear()} {t.footer.copy}</p>
        
        {visitorCount > 0 && (
          <div className="flex items-center gap-2 text-xs border border-white/10 px-3 py-1.5 rounded-full bg-white/5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
            <span>{t.footer.visitors}: {visitorCount.toLocaleString()}</span>
          </div>
        )}
      </div>
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed right-6 bottom-10 p-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all duration-300 rounded-full z-50 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </button>
    </footer>
  );
};
