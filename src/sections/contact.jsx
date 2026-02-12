import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
// import ParticlesBackground from "../components/Particlesbackground";
import Astra from "../assets/Astra.png";

/* -------------------- EMAILJS ENV -------------------- */
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const AUTOREPLY_TEMPLATE_ID =
  import.meta.env.VITE_AUTOREPLY_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  /* -------------------- handlers -------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};

    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field")
    );

    if (formData.service !== "other" && !formData.budget.trim()) {
      newErrors.budget = "Fill this field";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      const payload = {
        ...formData,
        from_name: formData.name,
        reply_to: formData.email,
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        payload,
        PUBLIC_KEY
      );


      await emailjs.send(
        SERVICE_ID,
        AUTOREPLY_TEMPLATE_ID,
        payload,
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  /* -------------------- JSX -------------------- */

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      
      <motion.div
        className="hidden md:flex w-full md:w-1/2 justify-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        <motion.img
          src={Astra}
          alt="Contact"
          className="w-72 md:w-96 rounded-2xl shadow-lg"
        />
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        <h2 className="text-3xl font-bold mb-6">Let’s Work Together</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label>Your Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`field ${errors.name && "border-red-500"}`}
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          <div>
            <label>Your Email *</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`field ${errors.email && "border-red-500"}`}
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          <div>
            <label>Service *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`field ${errors.service && "border-red-500"}`}
            >
              <option value="" disabled>
                Something in mind?
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Application">Mobile Application</option>
              <option value="other">Others</option>
            </select>
            {errors.service && (
              <p className="text-red-500 text-xs">{errors.service}</p>
            )}
          </div>

          {formData.service && formData.service !== "other" && (
            <div>
              <label>Budget *</label>
              <input
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`field ${errors.budget && "border-red-500"}`}
                placeholder="Your Budget"
              />
              {errors.budget && (
                <p className="text-red-500 text-xs">{errors.budget}</p>
              )}
            </div>
          )}

          <div>
            <label>Explain Your Idea *</label>
            <textarea
              name="idea"
              rows="4"
              value={formData.idea}
              onChange={handleChange}
              className={`field ${errors.idea && "border-red-500"}`}
              placeholder="Enter your idea"
            />
            {errors.idea && (
              <p className="text-red-500 text-xs">{errors.idea}</p>
            )}
          </div>

          {status && (
            <p
              className={`text-sm ${
                status === "success"
                  ? "text-green-400"
                  : status === "error"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? "Message sent successfully ✅"
                : "Something went wrong ❌"}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === "sending"}
            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-md font-semibold"
            type="submit"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
