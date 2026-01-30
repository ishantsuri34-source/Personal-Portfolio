import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose }) {
  const backdrop = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.25, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const panel = {
    hidden: {
      scale: 0.95,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.07
      }
    },
    exit: {
      scale: 0.96,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            background: "rgba(5, 5, 15, 0.85)"
          }}
        >
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ willChange: "transform, opacity" }}
          >
    
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white text-3xl hover:text-fuchsia-400 transition-colors duration-200"
              aria-label="Close Menu"
            >
              <FiX />
            </button>
            <motion.ul className="space-y-8 text-center">
              {[
                "Home",
                "About",
                "Skills",
                "Experience",
                "Testimonials",
                "Contact"
              ].map((itemText) => (
                <motion.li key={itemText} variants={item}>
                  <a
                    href={`#${itemText.toLowerCase()}`}
                    onClick={onClose}
                    className="
                      group relative inline-block
                      text-4xl font-semibold text-white
                      transition-colors duration-300
                      hover:text-fuchsia-400
                    "
                    style={{
                      textShadow: "0 0 14px rgba(168,85,247,0.35)"
                    }}
                  >
                    {itemText}

                    <span
                      className="
                        absolute left-0 -bottom-2
                        block h-0.5 w-full
                        origin-left scale-x-0
                        bg-linear-to-r from-fuchsia-400 via-purple-400 to-cyan-400
                        transition-transform duration-300 ease-out
                        group-hover:scale-x-100
                      "
                    />
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
