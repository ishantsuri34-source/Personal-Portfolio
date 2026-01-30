import { useEffect, useState } from "react";

export default function Customcursor() {
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;

    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999">
      <div
        className="absolute w-20 h-20 rounded-full opacity-80"
        style={{
          transform: `translate(${position.x - 40}px, ${position.y - 40}px)`,
          transition: "transform 0.08s cubic-bezier(0.22, 1, 0.36, 1)",
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.9), rgba(59,130,246,0.6), transparent)",
          filter: "blur(22px)",
        }}
      />
    </div>
  );
}
