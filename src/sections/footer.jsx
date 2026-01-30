import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const baseAnim =
    "transition-all duration-700 ease-out transform";

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden py-24 flex items-center justify-center bg-transparent"
    >
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4">
        <h1
          className={`${baseAnim}
            text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wide
            bg-linear-to-r from-white via-blue-500 to-indigo-600
            bg-size-[300%_300%]
            bg-clip-text text-transparent
            animate-gradientMove
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
          style={{ transitionDelay: "0ms" }}
        >
          Ishantpreet Singh Dhiman
        </h1>

        <div
          className={`${baseAnim}
            mx-auto mt-4 mb-6 w-28 h-0.5 rounded-full
            bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600
            ${visible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
          `}
          style={{ transitionDelay: "200ms" }}
        />

        <div
          className={`${baseAnim}
            flex justify-center gap-6 text-2xl mb-6
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
          style={{ transitionDelay: "400ms" }}
        >
          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/ishantpreet-singh-dhiman-193082260/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-gray-300 hover:text-[#0A66C2]"
          >
            <FaLinkedinIn />
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/ishantsuri34-source/Ishantpreet"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-gray-300 hover:text-purple-400"
          >
            <FaGithub />
          </motion.a>
        </div>

        <div
          className={`${baseAnim}
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-sm md:text-base text-gray-400 italic mb-2">
            “Success is when preparation meets opportunity.”
          </p>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Ishantpreet Singh Dhiman. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradientMove {
          animation: gradientMove 6s ease infinite;
        }
      `}</style>
    </footer>
  );
}
