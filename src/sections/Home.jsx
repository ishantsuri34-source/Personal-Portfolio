import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import ParticlesBackground from "../components/Particlesbackground";
import avator from "../assets/avator.png";

function EllipticalRing({
  width = 420,
  height = 280,
  color = "rgba(160,180,255,0.45)",
  duration = 36,
  tilt = 65,
  opacity = 0.45,
  reverse = false,
}) {
  const animationName = reverse ? "spinReverseCustom" : "spinCustom";

  return (
    <>
      <style>
        {`
          @keyframes spinCustom {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spinReverseCustom {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          width,
          height,
          borderRadius: "50%",
          border: `1.5px solid ${color}`,
          opacity,
          transform: `rotateX(${tilt}deg)`,
          transformStyle: "preserve-3d",
          animation: `${animationName} ${duration}s linear infinite`,
          boxShadow: "0 0 24px rgba(160,180,255,0.65)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

export default function Home() {
  const roles = useMemo(() => ["Frontend Developer", "Backend Developer"], []);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const t = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 900);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else {
        setDeleting(false);
        setIndex((v) => (v + 1) % roles.length);
      }
    }, deleting ? 40 : 70);

    return () => clearTimeout(t);
  }, [subIndex, index, deleting, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen pt-20 relative overflow-hidden bg-transparent"
    >

      <ParticlesBackground />


      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-24 -left-24 w-56 h-56 rounded-full blur-[160px]"
          style={{ background: "rgba(30, 70, 180, 0.18)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full blur-[160px]"
          style={{ background: "rgba(120, 60, 200, 0.15)" }}
        />
      </div>

     <div className="relative z-10 h-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
    
        <div className="flex flex-col justify-center text-center lg:text-left">
          <div className="text-xl font-semibold text-blue-200 mb-3 tracking-wide">
            {roles[index].substring(0, subIndex)}
            <span className="inline-block w-0.5 h-5 ml-1 bg-blue-300 animate-pulse" />
          </div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold
            text-transparent bg-clip-text
            bg-linear-to-r from-white via-blue-300 to-indigo-400"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Hello, I'm
            <br />
            <span className="text-white block mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Ishantpreet Singh Dhiman
            </span>
          </motion.h2>

          <p className="mt-6 text-blue-200/80 text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            I design and build high-performance web experiences that blend elegant
            design with scalable, modern technology to deliver real-world impact.
          </p>

          <div className="mt-8 flex gap-4 justify-center lg:justify-start flex-wrap">
            <a
              href="#experience"
              className="px-8 py-3 rounded-full font-semibold text-white
              bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600
              shadow-[0_0_35px_rgba(99,102,241,0.7)]
              hover:shadow-[0_0_65px_rgba(139,92,246,1)]
              hover:scale-110 transition-all duration-300"
            >
              View My Experience
            </a>

            <a
              href="/Resume.pdf"
              download
              className="px-8 py-3 rounded-full font-semibold text-white
              bg-white/10 backdrop-blur-md border border-white/30
              hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              My Resume
            </a>
          </div>

          <div className="mt-5 flex gap-4 text-3xl justify-center lg:justify-start">
            <motion.a
              href="https://www.linkedin.com/in/ishantpreet-singh-dhiman-193082260/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-[#0A66C2]"
            >
              <FaLinkedin />
            </motion.a>

            <motion.a
              href="https://github.com/ishantsuri34-source/Ishantpreet"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-white"
            >
              <FaGithub />
            </motion.a>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <EllipticalRing />
            <EllipticalRing
              width={550}
              height={360}
              opacity={0.35}
              duration={52}
              reverse
            />
          </div>

          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.img
              src={avator}
              alt="avator"
              className="w-600 max-h-screen object-contain"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
