import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState, useRef } from "react";

export default function Introanimation({ onFinish }) {
  const THEME_COLOR = "#9AC9FB";

  const greetings = useMemo(() => [
    "Hello",
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    "नमस्ते",
    "Hola",
    "Bonjour",
    "Ciao",
    "Olá",
    "Здравствуйте",
    "Merhaba",
    "Hej",
    "Salam",
  ], []);

  const TOTAL_TIME = 3000; 
  const PER_GREETING = Math.floor(TOTAL_TIME / greetings.length);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= greetings.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, PER_GREETING);

    return () => clearInterval(interval);
  }, [visible, greetings.length, PER_GREETING]);

  useEffect(() => {
    if (!visible) return;

    const endTimer = setTimeout(() => {
      setVisible(false);
    }, TOTAL_TIME);

    return () => clearTimeout(endTimer);
  }, [visible]);

  const handleSkip = () => setVisible(false);

  const progress = ((index + 1) / greetings.length) * 100;

  return (
    <>
      <audio ref={audioRef} src="/intro.mp3" preload="auto" />

      <AnimatePresence onExitComplete={onFinish}>
        {visible && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center text-white overflow-hidden"
            style={{
              background: `radial-gradient(circle at top, ${THEME_COLOR}22 0%, #000 60%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              y: "-100%",
              transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] },
            }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            <button
              onClick={handleSkip}
              className="absolute top-6 right-6 text-sm px-4 py-2 rounded-full border border-white/30
                         bg-white/5 hover:bg-white/10 backdrop-blur-md transition"
            >
              Skip
            </button>

            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                className="relative font-semibold tracking-wide text-center px-6
                           text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
                initial={{ opacity: 0, y: 16, scale: 0.98, filter: "blur(0.4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, scale: 1.02, filter: "blur(0.4px)" }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {greetings[index]}
              </motion.h1>
            </AnimatePresence>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[70%] max-w-420px h-4px bg-white/25 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ backgroundColor: THEME_COLOR }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
