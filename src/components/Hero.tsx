import { motion } from 'motion/react';
import { FadeIn } from './UI';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20 flex flex-col items-center">
        
        {/* Profile Picture Placeholder */}
        <FadeIn>
          <div className="mb-8 relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            {/* The user can replace this placeholder with their own image */}
            <img 
              src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=200&auto=format&fit=crop" 
              alt="Video Editor Portrait"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-8 md:w-12 bg-gray-400 block"></span>
            <span className="text-gray-300 uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold font-mono drop-shadow-md">{t.hero.subtitle}</span>
            <span className="h-[1px] w-8 md:w-12 bg-gray-400 block"></span>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-display font-bold leading-[0.9] tracking-tighter text-white mb-6 uppercase drop-shadow-2xl">
            {t.hero.titlePart1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 italic">{t.hero.titlePart2}</span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {t.hero.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <a href="#work" className="btn-glitch inline-flex items-center gap-3 px-8 py-4 uppercase tracking-widest font-bold text-xs md:text-sm cursor-pointer rounded-sm bg-white/5 border border-white/20 backdrop-blur-sm hover:border-white">
            {t.hero.viewTimeline}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">{t.hero.scroll}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </motion.div>
    </section>
  );
}
