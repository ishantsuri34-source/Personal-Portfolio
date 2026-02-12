import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import profile from "../assets/p.jpg";

const words = ["Fast", "Elegant", "Reliable"];

export default function About() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Experience", value: "6 Months", depth: 120 },
    { label: "Speciality", value: "Full Stack", depth: 200 },
    { label: "Focus", value: "Performance", depth: 160 },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white"
    >
 
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-24 left-24 w-80 h-80 bg-purple-500/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-24 right-24 w-96 h-96 bg-indigo-500/15 blur-[160px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div
        className="relative z-10 w-[94%] max-w-6xl rounded-3xl bg-white/5 backdrop-blur-xl
        border border-white/15 shadow-[0_0_120px_rgba(34,211,238,0.18)]
        px-6 py-10 md:px-12 md:py-14"
        initial={{ opacity: 0, y: 80, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
 
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            className="w-36 h-36 md:w-52 md:h-52 rounded-2xl overflow-hidden border border-white/20
            bg-linear-to-br from-blue-400/20 to-indigo-500/20"
         
          >
            <img src={profile} alt="profile" className="w-full h-full object-cover" />
          </motion.div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold
              bg-clip-text text-transparent bg-linear-to-r from-white via-blue-500 to-indigo-600">
              Ishantpreet Singh
            </h1>

            <p className="text-white/80 text-lg">Full Stack Developer</p>

            <div className="text-lg sm:text-xl font-medium flex justify-center md:justify-start gap-2">
              <span>I build</span>

              <div className="relative h-7 w-24 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    className="absolute left-0 top-0 bg-clip-text text-transparent
                    bg-linear-to-r from-cyan-300 to-indigo-400 font-bold"
                    initial={{ y: 50, opacity: 0, rotateX: 80 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -50, opacity: 0, rotateX: -80 }}
                    transition={{ duration: 0.8 }}
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <span>products</span>
            </div>

            <p className="text-white/70 max-w-xl leading-relaxed mt-3">
              I build scalable, modern applications with strong focus on clean architecture,
              performance and delightful user experience.
            </p>

            <div className="flex gap-4 mt-6 justify-center md:justify-start flex-wrap">
              <a
                href="#experience"
                className="px-6 py-3 rounded-xl font-semibold bg-linear-to-r
                from-cyan-400 to-indigo-500 text-black hover:scale-110 transition-transform"
              >
                Experience
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-semibold bg-white/10 backdrop-blur-md
                border border-white/25 hover:bg-white/20 hover:scale-110 transition-all"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

      
        <div
          className="relative mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >

         
          {stats.map((item, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl p-6 text-center bg-white/5 backdrop-blur-md
              border border-white/15 "
              initial={{
                opacity: 0,
                y: 120,
                scale: 0.8,
                filter: "blur(6px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              animate={{ y: [0, -10, 0] }}
              style={{
                transform: `translateZ(${item.depth}px)`,
              }}
            >
              <p className="text-sm text-cyan-300">{item.label}</p>
              <p className="text-xl font-bold mt-1">{item.value}</p>

              <div className="absolute inset-0 rounded-2xl bg-linear-to-r
              from-cyan-400/10 to-indigo-500/10 blur-xl -z-10" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 border-t border-white/10 pt-6 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-3 text-cyan-300">About Me</h3>
          <p className="text-white/70 max-w-3xl leading-relaxed mx-auto md:mx-0">
            I'm a Software Developer, Content Creator, and Web Developer — passionate about
            building fast, resilient applications and sharing coding insights.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
