import { FadeIn } from './UI';
import { skills, services, testimonials } from '../data';
import { Clapperboard, MonitorPlay, Smartphone, Aperture, Quote, Linkedin, Instagram, Facebook } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const VimeoIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 6.5c-1 3-5 9.5-6 10.5-1.5 2-3.5 2.5-5 2.5-2.5 0-3.5-2-4-3.5l-2-7c-.5-1.5-1.5-2-2.5-2.5L2 6.5c1-1 3.5-1 5-1 2 0 3 2 3.5 3.5l1.5 5.5c.5 1.5 1.5 2 2.5 1 .5-.5 1.5-2.5 2-4 .5-1.5 0-2.5-1-2.5-.5 0-1 .5-1.5 1 0-2 1.5-4 4.5-4 3 0 4.5 1.5 4.5 4z" />
  </svg>
);

const getIcon = (name: string) => {
  switch(name) {
    case 'clapperboard': return <Clapperboard size={32} className="text-white" />;
    case 'monitor-play': return <MonitorPlay size={32} className="text-white" />;
    case 'smartphone': return <Smartphone size={32} className="text-white" />;
    case 'aperture': return <Aperture size={32} className="text-white" />;
    default: return <Clapperboard size={32} className="text-white" />;
  }
};

export const About = () => {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-150px", "300px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["200px", "-200px"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.6, 0.1]);
  
  return (
  <section ref={ref} id="about" className="py-32 bg-black border-y border-white/5 relative overflow-hidden">
    <motion.div 
      style={{ y: bgY }}
      className="absolute -inset-[20%] opacity-20 bg-[url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center pointer-events-none grayscale mix-blend-screen"
    ></motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black pointer-events-none z-0"></div>

    <motion.div style={{ y: y1, opacity }} className="absolute top-0 right-10 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0"></motion.div>
    <motion.div style={{ y: y2, opacity }} className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none z-0"></motion.div>
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
      <FadeIn>
        <h2 className="text-xs text-gray-400 tracking-[0.3em] uppercase font-bold mb-4 font-mono">{t.about.subtitle}</h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight uppercase leading-tight">{t.about.title}</h3>
        <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
          {t.about.p1}
        </p>
        <p className="text-gray-400 text-lg leading-relaxed mix-blend-luminosity font-light">
          {t.about.p2}
        </p>
      </FadeIn>
      
      <FadeIn delay={0.2} className="space-y-8">
        {skills.map(skill => (
          <div key={skill.name}>
            <div className="flex justify-between font-mono text-sm text-gray-300 mb-2 uppercase tracking-wide">
              <span>{skill.name}</span>
              <span className="text-gray-400">{skill.level}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </FadeIn>
    </div>
  </section>
  );
};

export const Services = () => {
  const { t } = useLanguage();

  return (
  <section id="services" className="py-32 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
    <FadeIn className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4 tracking-tight">{t.servicesTab.titlePart1} <br/><span className="text-gray-600 italic">{t.servicesTab.titlePart2}</span></h2>
    </FadeIn>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service, i) => (
        <FadeIn key={service.title} delay={i * 0.1} className="p-8 bg-black/40 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2">
          <div className="mb-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 origin-left">
            {getIcon(service.icon)}
          </div>
          <h3 className="text-xl font-display font-bold mb-3 uppercase tracking-wide">{service.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed font-light">{service.description}</p>
        </FadeIn>
      ))}
    </div>
  </section>
  );
};

export const Testimonials = () => {
  const { t } = useLanguage();

  return (
  <section className="py-32 bg-black/50 backdrop-blur-md border-y border-white/5 relative">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      <FadeIn className="mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold uppercase text-center tracking-tight">{t.testimonialsTab.title}</h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((item, i) => (
          <FadeIn key={i} delay={i * 0.2} className="relative p-10 border border-white/10 bg-black/40 backdrop-blur-md hover:border-white/20 transition-colors">
            <Quote className="absolute top-8 right-8 text-white/5" size={64} />
            <p className="text-xl text-gray-300 font-light italic mb-8 relative z-10 leading-relaxed">"{item.text}"</p>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-white text-sm">{item.name}</h4>
              <p className="text-xs font-mono flex items-center text-gray-400 mt-1 uppercase">{item.role}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
  );
};

export const Contact = () => {
  const { t } = useLanguage();

  return (
  <section id="contact" className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent z-0"></div>
    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
      <FadeIn>
        <h2 className="text-5xl md:text-7xl font-display font-bold uppercase mb-6 drop-shadow-2xl tracking-tighter">
          {t.contact.titlePart1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white italic">{t.contact.titlePart2}</span>
        </h2>
        <p className="text-lg text-gray-400 mb-12 font-light">{t.contact.description}</p>
      </FadeIn>
      
      <FadeIn delay={0.2}>
        <form className="space-y-6 text-left max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder={t.contact.name}
              required
              className="w-full bg-black/50 backdrop-blur-md border border-white/20 p-4 text-white focus:border-white outline-none uppercase font-mono text-xs tracking-widest transition-colors placeholder:text-gray-600"
            />
            <input 
              type="email" 
              placeholder={t.contact.email}
              required
              className="w-full bg-black/50 backdrop-blur-md border border-white/20 p-4 text-white focus:border-white outline-none uppercase font-mono text-xs tracking-widest transition-colors placeholder:text-gray-600"
            />
          </div>
          <input 
            type="tel" 
            placeholder={t.contact.whatsapp}
            required
            className="w-full bg-black/50 backdrop-blur-md border border-white/20 p-4 text-white focus:border-white outline-none uppercase font-mono text-xs tracking-widest transition-colors placeholder:text-gray-600"
          />
          <textarea 
            placeholder={t.contact.message}
            rows={5}
            className="w-full bg-black/50 backdrop-blur-md border border-white/20 p-4 text-white focus:border-white outline-none uppercase font-mono text-xs tracking-widest transition-colors resize-none placeholder:text-gray-600"
          ></textarea>
          <button 
            type="submit"
            className="w-full bg-white text-black font-bold uppercase tracking-widest py-5 hover:bg-gray-200 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] text-sm"
          >
            {t.contact.submit}
          </button>
          
          <div className="pt-12 flex justify-center items-center gap-8 border-t border-white/5 mt-8">
             <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 hover:scale-110 transform">
               <Instagram size={24} />
             </a>
             <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 hover:scale-110 transform">
               <Facebook size={24} />
             </a>
             <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 hover:scale-110 transform">
               <VimeoIcon size={24} />
             </a>
             <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 hover:scale-110 transform">
               <Linkedin size={24} />
             </a>
          </div>
        </form>
      </FadeIn>
    </div>
  </section>
  );
};
