import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const experience = [
  {
    role: "Full-Stack Developer Trainee",
    place: "Rayat-Bhara University, Mohali",
    duration: "July 2025 – December 2025",
    description:
      "Completed intensive training in full-stack development including frontend frameworks, backend APIs, databases, and production workflows."
  },
  {
    role: "Web Developer",
    place: "Rayat-Bhara University, Mohali",
    duration: "2026",
    description:
      "Built high-performance websites with clean UI/UX, responsive layouts, accessibility standards, and optimized frontend architecture."
  }
];

export default function Experience() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });


  const sectionOpacity = useTransform(scrollYProgress, [0, 0.0], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 0.0], [40, 0]);

  const smooth = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 22,
    mass: 0.7
  });

  const lineWidth = useTransform(smooth, [0.08, 0.6], ["0%", "100%"]);

  const circleOpacity = useTransform(smooth, [0.15, 0.25], [0, 1]);
  const circleScale = useTransform(smooth, [0.15, 0.25], [0.5, 1]);

  const firstOpacity = useTransform(smooth, [0.25, 0.35], [0, 1]);
  const firstY = useTransform(smooth, [0.25, 0.35], [-40, 0]);

  const secondOpacity = useTransform(smooth, [0.55, 0.7], [0, 1]);
  const secondY = useTransform(smooth, [0.55, 0.7], [40, 0]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative h-[320vh] bg-transparent text-white"
    >
      <motion.div
        className="sticky top-0 h-screen flex flex-col items-center justify-center px-6"
        style={{ opacity: sectionOpacity, y: sectionY }}
      >

        <h2 className="text-4xl md:text-5xl font-semibold mb-20 ">
          Experience
        </h2>


        <div className="relative w-full max-w-6xl hidden md:block">

          <div className="absolute top-1/2 left-0 w-full h-0.75 bg-white/20" />

          <motion.div
            className="absolute top-1/2 left-0 h-0.75"
            style={{
              width: lineWidth,
              background: "linear-gradient(90deg,#fff,#9ecbff,#fff)",
              boxShadow: "0 0 12px rgba(160,200,255,.8)"
            }}
          />

          <div className="flex justify-between items-center relative">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="w-5 h-5 rounded-full bg-white z-10"
                style={{ opacity: circleOpacity, scale: circleScale }}
                animate={{
                  boxShadow: [
                    "0 0 0px #9ecbff",
                    "0 0 18px #9ecbff",
                    "0 0 0px #9ecbff"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            ))}
          </div>

          <motion.div
            className="absolute left-0 bottom-[140%] w-80 bg-[#0b1320]/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl"
            style={{ opacity: firstOpacity, y: firstY }}
          >
            <h3 className="font-semibold text-lg">{experience[0].role}</h3>
            <p className="text-sm text-gray-400">
              {experience[0].place} | {experience[0].duration}
            </p>
            <p className="mt-3 text-sm text-gray-300">
              {experience[0].description}
            </p>
          </motion.div>

          <motion.div
            className="absolute right-0 top-[140%] w-80 bg-[#0b1320]/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl"
            style={{ opacity: secondOpacity, y: secondY }}
          >
            <h3 className="font-semibold text-lg">{experience[1].role}</h3>
            <p className="text-sm text-gray-400">
              {experience[1].place} | {experience[1].duration}
            </p>
            <p className="mt-3 text-sm text-gray-300">
              {experience[1].description}
            </p>
          </motion.div>
        </div>

        {/* -------MOBILE------- */}
        <div className="md:hidden relative w-full max-w-md mt-10">

          <div className="absolute left-3 top-0 h-full w-0.75 bg-white/20" />

          <motion.div
            className="absolute left-3 top-0 w-0.75"
            style={{
              height: lineWidth,
              background: "linear-gradient(180deg,#fff,#9ecbff,#fff)"
            }}
          />

          <div className="space-y-24 pl-12">
            {experience.map((item, i) => (
              <motion.div
                key={i}
                className="relative"
                style={{
                  opacity: i === 0 ? firstOpacity : secondOpacity,
                  y: i === 0 ? firstY : secondY
                }}
              >
                <motion.div
                  className="absolute -left-8.5 top-3 w-4 h-4 rounded-full bg-white"
                  animate={{
                    boxShadow: [
                      "0 0 0px #9ecbff",
                      "0 0 18px #9ecbff",
                      "0 0 0px #9ecbff"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="bg-[#0b1320]/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
                  <h3 className="font-semibold">{item.role}</h3>
                  <p className="text-sm text-gray-400">
                    {item.place} | {item.duration}
                  </p>
                  <p className="mt-3 text-sm text-gray-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
