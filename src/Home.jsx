import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, ExternalLink, ChevronRight, Share2, Disc } from 'lucide-react';
import gifBg from './images/gif.gif';
import EP from './images/EP.jpg';
import One from './images/one.jpg';
import Two from './images/two.jpg';
import Three from './images/three.jpg';




// --- DATA & CONFIG ---
const ARTIST_NAME = "BOYPRODIGAL";
const TAGLINE = "The Voice of the Prodigal Society";

// Hero Video (YouTube - 30s loop) 
const HERO_VIDEO_ID = "b17ggN8TZUs";
const HERO_VIDEO_POSTER = "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2670&auto=format&fit=crop";

// Swapped images for a darker, more "dangerous" aesthetic
const IMAGES = {
  // Bio Parallax: A strong, solitary figure
  bio: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop",
  // Album Art
  ep: EP,
  // Gallery - updated for more classic arrangement
  gallery: [One, Two, Three]
};

const STREAMING_LINKS = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/4sYBlSgFGM0SnyKBQLNOC6?si=rn8giuk_ThixEPNJAg-RRQ",
    color: "group-hover:text-[#1DB954]",
    borderColor: "group-hover:border-[#1DB954]",
    bg: "group-hover:bg-[#1DB954]/10"
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/us/artist/boyprodigal/1872366045", 
    color: "group-hover:text-[#FA243C]",
    borderColor: "group-hover:border-[#FA243C]",
    bg: "group-hover:bg-[#FA243C]/10"
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.com.mx/artists/B0GK1PZ8CH/boyprodigal?marketplaceId=A1AM78C64UM0Y8&musicTerritory=MX&ref=dm-sh_TQYmKJPhJjLW5CDLysOVfthL8",
    color: "group-hover:text-[#00A8E1]",
    borderColor: "group-hover:border-[#00A8E1]",
    bg: "group-hover:bg-[#00A8E1]/10"
  },
  {
    name: "Audiomack",
    url: "https://audiomack.com/boyprodigal",
    color: "group-hover:text-[#FFA200]",
    borderColor: "group-hover:border-[#FFA200]",
    bg: "group-hover:bg-[#FFA200]/10"
  }
];

// --- COMPONENTS ---

const Section = ({ children, className = "", id = "" }) => (
  <section id={id} className={`min-h-screen relative overflow-hidden px-4 sm:px-6 md:px-8 py-16 md:py-24 flex flex-col justify-center ${className}`}>
    {children}
  </section>
);

const GothicHeading = ({ text, className = "", size = "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`${className} ${size} font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-black drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]`}
  >
    {text}
  </motion.h2>
);

const ParallaxImage = ({ src, alt }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  
  return (
    <div ref={ref} className="overflow-hidden w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] relative shadow-2xl shadow-red-900/20 border-y border-red-900/30">
      <motion.div style={{ y, scale }} className="w-full h-[120%] absolute top-[-10%] left-0">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover grayscale contrast-125 brightness-75 hover:grayscale-0 hover:brightness-90 transition-all duration-1000 ease-out"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </div>
  );
};

// --- MAIN APP ---

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div className="bg-[#020000] text-neutral-200 font-sans selection:bg-red-900 selection:text-white overflow-x-hidden perspective-1000 cursor-none">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Montserrat:wght@200;300;400;600;900&family=Nosifer&display=swap');
        .font-cinzel { font-family: 'Cinzel Decorative', cursive; }
        .font-nosifer { font-family: 'Nosifer', cursive; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        
        .noise-bg {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 50;
          opacity: 0.35;
          mix-blend-mode: overlay;
        }

        html { scroll-behavior: smooth; }
        
        @media (max-width: 768px) {
          .cursor-none { cursor: auto; }
        }
      `}</style>

      <div className="noise-bg"></div>
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_farthest-corner_at_50%_50%,_rgba(69,10,10,0.15),_transparent_70%)] animate-pulse duration-[5000ms]"></div>
      </div>
      
      {!isMobile && (
        <>
          <motion.div 
            className="fixed w-10 h-10 border border-red-600/60 rounded-full pointer-events-none z-[100] mix-blend-difference backdrop-blur-[1px]"
            animate={{ x: mousePosition.x - 20, y: mousePosition.y - 20 }}
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
          />
          <motion.div 
            className="fixed w-2 h-2 bg-red-600 rounded-full pointer-events-none z-[100] shadow-[0_0_10px_rgba(220,38,38,0.8)]"
            animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
          />
        </>
      )}

      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-900 to-red-600 origin-left z-[60]" style={{ scaleX }} />

      <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 py-4 md:py-6 flex justify-between items-center mix-blend-difference backdrop-blur-sm">
         <a href="#" className="font-cinzel font-black text-xl sm:text-2xl text-red-600 tracking-widest hover:scale-110 transition-transform">BP</a>
         <div className="hidden md:flex gap-6 lg:gap-10 text-xs font-montserrat font-bold tracking-[0.2em] uppercase">
            {['Origins', 'Works', 'Visions', 'Ritual'].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase()}`} className="hover:text-red-600 transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
         </div>
         <div className="flex md:hidden gap-4">
           <a href="#music" className="text-red-600">
             <Disc className="animate-spin-slow w-5 h-5" />
           </a>
         </div>
      </nav>

      <main className="relative z-10">

        {/* --- HERO SECTION WITH VIDEO --- */}
        <section className="h-screen relative flex items-center justify-center overflow-hidden" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
          {/* GIF Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img
              src={gifBg}
              alt="Hero Background"
              className="w-full h-full object-cover"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
            {/* Red tint overlay */}
            <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay"></div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          </div>

          <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-6xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-nosifer text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-800 drop-shadow-[0_10px_30px_rgba(220,38,38,0.5)] tracking-tighter"
            >
              {ARTIST_NAME}
            </motion.h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "150px" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-1 bg-red-600 my-6 sm:my-8 shadow-[0_0_15px_rgba(220,38,38,1)]"
            />

            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ delay: 1, duration: 1 }}
              className="font-montserrat text-xs sm:text-sm md:text-lg lg:text-xl uppercase text-red-500 font-bold px-4"
            >
              {TAGLINE}
            </motion.p>
          </div>

          <motion.div 
             className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:text-red-500 transition-colors"
             animate={{ y: [0, 10, 0] }}
             transition={{ repeat: Infinity, duration: 2 }}
             onClick={() => document.getElementById('origins').scrollIntoView()}
          >
             <span className="text-[10px] uppercase tracking-wider sm:tracking-widest font-montserrat font-bold">The Descent</span>
             <ChevronRight className="rotate-90 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          </motion.div>
        </section>

        {/* --- ORIGINS (Parallax) --- */}
        <section id="origins" className="min-h-screen bg-black relative py-12 sm:py-16 md:py-20">
          <div className="w-full relative z-0">
             <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
             <ParallaxImage src={IMAGES.bio} alt="Boyprodigal Origins" />
             <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 sm:px-6 z-20 pointer-events-none">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="text-center"
                >
                   <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-white/10 font-black tracking-widest uppercase mix-blend-overlay">Rhymz</h2>
                </motion.div>
             </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-32">
             <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/5 p-6 sm:p-8 md:p-12 lg:p-16 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <GothicHeading text="The Origin" size="text-3xl sm:text-4xl md:text-5xl lg:text-6xl" className="mb-6 sm:mb-8" />
                <div className="font-montserrat text-neutral-400 text-base sm:text-lg md:text-xl leading-relaxed font-light space-y-4 sm:space-y-6">
                   <p><strong className="text-white font-bold">Boyprodigal</strong> (Prince Adusu) was forged in the creative fires of <span className="text-red-500 font-bold">Ghana</span>. From Obuasi to the streets of Accra, his voice is a weapon of precision.</p>
                   <p>What began at <span className="text-white border-b border-red-800">Koforidua Secondary Technical School</span> has mutated into the <span className="font-cinzel text-red-500 text-xl sm:text-2xl mx-1">Prodigal Society</span>—a dedicated legion of fans.</p>
                </div>
                
                <div className="mt-8 sm:mt-12 flex items-center gap-4 sm:gap-8 border-t border-white/10 pt-6 sm:pt-8">
                   <div className="text-center">
                      <span className="block font-cinzel text-2xl sm:text-3xl text-red-600">2003</span>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-600">Born</span>
                   </div>
                   <div className="h-8 sm:h-12 w-[1px] bg-white/10"></div>
                   <div className="text-center">
                      <span className="block font-cinzel text-2xl sm:text-3xl text-white">INF</span>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-600">Legacy</span>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* --- WORKS (Music) --- */}
        <Section id="works" className="bg-[#050000]">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
             <div className="lg:col-span-5 space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
                <span className="text-red-600 font-bold tracking-[0.5em] text-xs uppercase animate-pulse">Now Streaming</span>
                <GothicHeading text="Prodigal EP" />
                <p className="font-montserrat text-neutral-400 text-base sm:text-lg leading-relaxed">
                   The debut offering. A collection of sonic emotional blending technical lyricism with world-class production. This is the new standard.
                </p>
                
                <div className="space-y-1 pt-4 sm:pt-6">
                   {["Amanie", "Emotional Trapper", "My Path"].map((track, i) => (
                      <div key={i} className="flex items-center justify-between py-3 sm:py-4 border-b border-white/5 group hover:bg-white/5 px-3 sm:px-4 transition-colors cursor-pointer">
                         <span className="font-cinzel text-neutral-500 group-hover:text-red-500 transition-colors">0{i+1}</span>
                         <span className="font-montserrat font-bold text-neutral-300 group-hover:text-white uppercase tracking-wider text-sm sm:text-base">{track}</span>
                         <Play className="w-4 h-4 text-red-600 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                   ))}
                </div>
             </div>

             <div className="lg:col-span-7 order-1 lg:order-2 relative group perspective-1000">
                <motion.div 
                   whileHover={!isMobile ? { rotateY: 10, rotateX: -5 } : {}}
                   whileInView={isMobile ? { rotateY: 10, rotateX: -5 } : {}}
                   initial={isMobile ? { rotateY: 0, rotateX: 0 } : {}}
                   transition={{ type: "spring", stiffness: 100 }}
                   viewport={{ once: false }}
                   className="relative z-10 aspect-square max-w-md sm:max-w-lg mx-auto"
                >
                   <div className="absolute inset-0 bg-red-600/30 blur-[60px] sm:blur-[80px] -z-10 group-hover:bg-red-600/50 transition-colors duration-500"></div>
                   
                   <img 
                      src={EP} 
                      alt="Prodigal EP" 
                      className="w-full h-full object-cover shadow-2xl border border-white/10"
                   />
                   
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </motion.div>
             </div>
          </div>
        </Section>

        {/* --- VISIONS (Gallery) - CLASSIC REDESIGN --- */}
        <section id="visions" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-black relative">
           <div className="px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-4 sm:gap-6">
              <GothicHeading text="GALLERY" size="text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
              <p className="font-montserrat text-xs tracking-[0.3em] text-neutral-500 uppercase text-right">Glimpses into the void</p>
           </div>

           {/* Classic Gallery Layout with staggered arrangement */}
           <div className="max-w-7xl mx-auto px-4 sm:px-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
               {IMAGES.gallery.slice(0, 6).map((img, idx) => {
                 // Different sizes for staggered effect
                 const heightClasses = [
                   "h-[300px] sm:h-[400px] md:h-[500px]",
                   "h-[250px] sm:h-[350px] md:h-[450px]",
                   "h-[350px] sm:h-[450px] md:h-[550px]"
                 ];
                 
                 // Classic framing with different aspect ratios
                 const frameClasses = [
                   "md:col-span-2 lg:col-span-1",
                   "md:col-span-1",
                   "md:col-span-1 lg:col-span-2",
                   "md:col-span-2 lg:col-span-1",
                   "md:col-span-1 lg:col-span-1",
                   "md:col-span-1 lg:col-span-2"
                 ];
                 
                 return (
                   <motion.div
                     key={idx}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6, delay: idx * 0.1 }}
                     className={`relative group overflow-hidden ${frameClasses[idx]} ${heightClasses[idx % 3]}`}
                   >
                     {/* Classic image frame effect */}
                     <div className="absolute inset-0 border-2 border-red-900/30 z-20 pointer-events-none"></div>
                     <div className="absolute inset-4 border border-white/10 z-20 pointer-events-none"></div>
                     
                     {/* Image with classic filter */}
                     <img
                       src={IMAGES.gallery[idx]}
                       alt={`Vision ${idx + 1}`}
                       className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                     />
                     
                     {/* Vintage overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 mix-blend-multiply"></div>
                     <div className="absolute inset-0 bg-red-900/10 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     
                     {/* Classic label */}
                     <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black to-transparent">
                       <div className="flex justify-between items-center">
                         <div>
                           <span className="font-cinzel text-xl sm:text-2xl text-white block">VISION 0{idx + 1}</span>
                           <span className="font-montserrat text-xs text-neutral-400 uppercase tracking-widest">Archive {2020 + idx}</span>
                         </div>
                         <div className="w-8 h-[1px] bg-red-600"></div>
                       </div>
                     </div>
                     
                     {/* Top corner number - classic photography style */}
                     <div className="absolute top-4 left-4 z-30 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                       <span className="font-cinzel text-4xl sm:text-5xl text-white/20">0{idx + 1}</span>
                     </div>
                   </motion.div>
                 );
               })}
             </div>
           </div>
        </section>

        {/* --- RITUAL (Links) --- */}
        <section id="ritual" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#0a0000] border-t border-red-900/30 relative overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] border-[1px] border-white rounded-full animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] border-[1px] border-white rotate-45"></div>
           </div>

           <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
              <GothicHeading text="STREAM MY SONGS" size="text-3xl sm:text-4xl md:text-5xl lg:text-6xl" className="mb-8 sm:mb-12 md:mb-16" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                 {STREAMING_LINKS.map((link, i) => (
                   <motion.a 
                     key={i}
                     href={link.url}
                     target="_blank"
                     rel="noreferrer"
                     whileHover={{ scale: 1.02 }}
                     className={`group relative h-24 sm:h-28 md:h-32 flex items-center justify-between px-6 sm:px-8 md:px-10 border border-white/10 bg-black/50 overflow-hidden transition-all duration-300 ${link.borderColor}`}
                   >
                      <div className="relative z-10 text-left">
                         <h3 className={`font-cinzel text-lg sm:text-xl md:text-2xl text-neutral-300 transition-colors duration-300 ${link.color}`}>{link.name}</h3>
                         <span className="text-[10px] uppercase tracking-widest text-neutral-600 group-hover:text-neutral-400">Stream Now</span>
                      </div>
                      
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-transparent ${link.bg} transition-all duration-300`}>
                        <ExternalLink className={`w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 transition-colors ${link.color}`} />
                      </div>

                      <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                   </motion.a>
                 ))}
              </div>
           </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-black py-8 sm:py-12 border-t border-white/5 flex flex-col items-center justify-center gap-3 sm:gap-4">
           <h2 className="font-nosifer text-2xl sm:text-3xl text-red-900/50 hover:text-red-700 transition-colors cursor-pointer tracking-widest">
              BOYPRODIGAL
           </h2>
           <p className="font-montserrat text-neutral-600 text-[10px] uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Prodigal Society. All Rights Reserved.
           </p>
        </footer>

      </main>
    </div>
  );
}
