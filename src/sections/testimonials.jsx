import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Startup Founder",
    rating: 4,
    image: img1,
    text: "Ishant delivered beyond expectations. His attention to detail, modern design sense, and clean code quality made our product feel truly world-class.",
  },
  {
    name: "Simran Kaur",
    role: "Product Manager",
    rating: 4.5,
    image: img2,
    text: "Working with Ishant was smooth and professional. He understands requirements quickly and transforms ideas into beautiful user experiences.",
  },
  {
    name: "Neha Sharma",
    role: "Tech Lead",
    rating: 4.5,
    image: img3,
    text: "Reliable, skilled, and creative. Ishant is someone you can trust with complex projects and tight deadlines without any compromise on quality.",
  },
  {
    name: "Rahul Verma",
    role: "UI/UX Designer",
    rating: 5,
    image: img4,
    text: "His frontend skills and design sense are outstanding. The final result exceeded what we initially imagined.",
  },
];


function StarRating({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-500" />);
    }
  }

  return <div className="flex gap-1 mb-3">{stars}</div>;
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full py-24 text-white overflow-hidden bg-black"
    >
  
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
       <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-white via-blue-300 to-indigo-400 bg-clip-text text-transparent">
            What People Say
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Real feedback from people I’ve worked with — reflecting trust, quality,
            and passion for building modern digital experiences.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t, index) => (
            <div
              key={index}
              style={{ transitionDelay: `${index * 150}ms` }}
              className={`relative rounded-xl p-px transition-all duration-700 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
            >
            
              <div className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-400/30 via-indigo-500/30 to-purple-500/30 blur-xl opacity-70"></div>

            
              <div
                className="
                  relative h-full rounded-xl p-6
                  backdrop-blur-xl
                  bg-linear-to-br from-[#0f1c2e]/90 via-[#0b1a2a]/90 to-[#081421]/90
                  border border-white/10
                  transform transition-all duration-500
                  hover:-translate-y-3 hover:rotate-[0.5deg] hover:scale-[1.02]
                  hover:shadow-[0_20px_60px_rgba(56,189,248,0.35)]
                "
              >
             
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border border-white/20"
                  />

                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                </div>


                <StarRating rating={t.rating} />

                <p className="text-gray-300 text-sm leading-relaxed">
                  “{t.text}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
