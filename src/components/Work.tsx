import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { FadeIn } from './UI';
import { projects } from '../data';
import { Play, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectCard = ({ project, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(()=>console.log("Autoplay blocked"));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const { t } = useLanguage();

  return (
    <>
      <motion.div 
        layout
        className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center cursor-pointer group mb-16 md:mb-32 pl-12 md:pl-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onClick={() => { setIsOpen(true); setIsVideoLoaded(false); }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Timeline node */}
        <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-[10px] h-[10px] bg-white rounded-full z-10 shadow-[0_0_10px_rgba(255,255,255,0.8)] mix-blend-screen group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] group-hover:scale-150 transition-all duration-300"></div>

        <div className={`md:col-span-5 ${index % 2 === 0 ? 'md:order-1 md:text-right md:pr-12' : 'md:order-3 md:pl-12'}`}>
          <div className="text-gray-400 font-mono text-sm mb-2 opacity-80 drop-shadow-md">SEQ_{project.id}</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 group-hover:text-white text-gray-300 transition-colors uppercase">
            {project.title}
          </h2>
          <p className="text-gray-400 font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block uppercase tracking-widest text-xs">
            {project.category}
          </p>
        </div>
        
        <div className="md:col-span-2 hidden md:flex justify-center order-2">
           {/* Center line space occupied by parent's pseudo track */}
        </div>

        <div 
          className={`md:col-span-5 relative aspect-video overflow-hidden border border-white/10 bg-gray-900 ${index % 2 === 0 ? 'md:order-3' : 'md:order-1'}`}
        >
          <video 
            ref={videoRef}
            src={project.videoUrl} 
            muted 
            loop 
            playsInline
            className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${isHovered ? 'scale-100' : 'scale-110 grayscale opacity-80'}`}
          />
          {/* Letterbox Effect (Top & Bottom Bars) */}
          <div className={`absolute top-0 left-0 right-0 bg-black transition-all duration-700 ease-in-out z-10 ${isHovered ? 'h-[12%]' : 'h-0'}`}></div>
          <div className={`absolute bottom-0 left-0 right-0 bg-black transition-all duration-700 ease-in-out z-10 ${isHovered ? 'h-[12%]' : 'h-0'}`}></div>
          
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center z-20 pointer-events-none">
            <div className={`w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 transform ${isHovered ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
              <Play className="ml-1" size={24} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-lg"
        >
          <button onClick={() => { setIsOpen(false); setIsVideoLoaded(false); }} className="absolute top-6 right-6 text-white hover:text-gray-400 z-50 transition-colors">
            <X size={32} />
          </button>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 h-full lg:h-auto overflow-y-auto pt-16 lg:pt-0"
          >
            <div className="lg:col-span-2 aspect-video bg-black/50 border border-white/10 relative shadow-2xl overflow-hidden">
                {!isVideoLoaded && (
                   <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 z-10 backdrop-blur-sm">
                       <motion.div 
                         animate={{ rotate: 360 }} 
                         transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                         className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
                       />
                   </div>
                )}
                <motion.video 
                  src={project.videoUrl} 
                  controls 
                  autoPlay 
                  onLoadedData={() => setIsVideoLoaded(true)}
                  initial={{ filter: 'blur(10px)', scale: 1.05 }}
                  animate={{ 
                    filter: isVideoLoaded ? 'blur(0px)' : 'blur(10px)',
                    scale: isVideoLoaded ? 1 : 1.05
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isVideoLoaded ? 1 : 0, x: isVideoLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="flex flex-col justify-center space-y-6"
            >
              <div>
                <h3 className="text-sm tracking-widest text-gray-400 uppercase font-bold mb-2 font-mono">{t.work.projectDetails}</h3>
                <h2 className="text-4xl font-display font-bold text-white mb-4 uppercase">{project.title}</h2>
                <p className="text-gray-400 text-base leading-relaxed font-light">{project.description}</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-mono">{t.work.toolsUsed}</h4>
                <div className="flex flex-wrap gap-2">
                   {project.tools.map((tool: string) => (
                     <span key={tool} className="px-3 py-1 border border-white/10 text-xs font-mono text-gray-300 bg-white/5 uppercase tracking-wider">
                       {tool}
                     </span>
                   ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { t } = useLanguage();
  
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="work" className="py-24 md:py-40 relative px-6 md:px-12 max-w-7xl mx-auto">
      {/* Main Timeline Track */}
      <div className="absolute left-[54px] md:left-1/2 -ml-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-0"></div>

      <FadeIn className="text-center mb-10 md:mb-16">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase">{t.work.titlePart1} <span className="opacity-30">{t.work.titlePart2}</span></h2>
      </FadeIn>

      <FadeIn className="flex flex-wrap justify-center gap-3 mb-20 md:mb-28 relative z-10 max-w-3xl mx-auto">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-5 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
              activeFilter === category 
                ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                : 'border border-white/20 text-gray-400 hover:border-white/60 hover:text-white bg-black/50 backdrop-blur-sm'
            }`}
          >
            {category === 'All' ? t.work.all : category}
          </button>
        ))}
      </FadeIn>

      <div className="relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
