import React, { useEffect, useRef, useState } from "react";

import { IoLogoNodejs } from "react-icons/io5";
import { DiJavascript } from "react-icons/di";
import { PiFileHtml } from "react-icons/pi";
import { MdCss } from "react-icons/md";
import { FaReact } from "react-icons/fa";

const skills = [
  { icon: IoLogoNodejs, name: "Node.js", color: "#22c55e", level: 80 },
  { icon: DiJavascript, name: "JavaScript", color: "#facc15", level: 85 },
  { icon: PiFileHtml, name: "HTML", color: "#f97316", level: 90 },
  { icon: MdCss, name: "CSS", color: "#38bdf8", level: 88 },
  { icon: FaReact, name: "React", color: "#61dafb", level: 92 },
];

export default function Skills() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  const [selected, setSelected] = useState(null);
  const [barWidth, setBarWidth] = useState(0);
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(false);

  const closePopup = () => {
    setSelected(null);
    setBarWidth(0);
    setCounter(0);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    const speed = 0.4;
    const singleWidth = track.scrollWidth / 2;
    let rafId;

    const animate = () => {
      offset -= speed;
      if (Math.abs(offset) >= singleWidth) offset = 0;
      track.style.transform = `translate3d(${offset}px,0,0)`;
      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (!selected) return;

    let current = 0;
    const end = selected.level;
    const step = end / 60;

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setCounter(Math.round(current));
    }, 16);

    return () => clearInterval(timer);
  }, [selected]);


  useEffect(() => {
    if (!selected) return;
    const t = setTimeout(closePopup, 3000);
    return () => clearTimeout(t);
  }, [selected]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative h-82 w-full py-20 flex flex-col items-center justify-center text-white bg-black overflow-hidden"
    >
 
      <div className="pointer-events-none absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />


      <h2
        className={`absolute top-15 text-4xl md:text-5xl font-extrabold bg-linear-to-r from-white via-blue-300 to-indigo-400 bg-clip-text text-transparent transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        My Skills
      </h2>

      <p
        className={`mt-3 absolute top-25 text-cyan-200/70 text-sm md:text-base transition-all duration-700 delay-150 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        Modern Applications | Modern Technologies
      </p>


      <div
        className={` absolute bottom-0 left-0 w-full mt-12 overflow-hidden transition-all duration-700 delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div
          ref={trackRef}
          className="flex flex-nowrap will-change-transform"
          style={{ width: "max-content" }}
        >
          {[...skills, ...skills].map((skill, index) => {
            const Icon = skill.icon;

            return (
              <div
                key={index}
                onClick={() => setSelected(skill)}
                className="cursor-pointer flex flex-col items-center justify-center w-75 h-32 backdrop-blur-md bg-white/5 border border-white/4 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
              >
                <Icon size={50} color={skill.color} />
                <span className="mt-2 text-sm font-medium" style={{ color: skill.color }}>
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>


      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          onClick={closePopup}
        >
          <div
            className="bg-[#0b1220] p-6 rounded-xl border border-white/20 w-80"
            onClick={(e) => e.stopPropagation()}
            ref={(el) => {
              if (el) requestAnimationFrame(() => setBarWidth(selected.level));
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <selected.icon size={44} color={selected.color} />
              <h3 className="text-lg font-semibold">{selected.name}</h3>
            </div>

            <div className="h-3 bg-white/10 rounded overflow-hidden">
              <div
                className="h-full transition-all duration-1000 ease-out bg-linear-to-r from-cyan-400 via-sky-400 to-indigo-500 animate-pulse"
                style={{ width: `${barWidth}%` }}
              />
            </div>

            <p className="mt-2 text-sm text-cyan-200/80">
              Proficiency: {counter}%
            </p>

            <button
              onClick={closePopup}
              className="mt-4 px-4 py-2 bg-white/10 rounded hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
