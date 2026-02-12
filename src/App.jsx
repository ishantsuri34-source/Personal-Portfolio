import Navbar from "./components/Navbar";
import About from "./sections/about";
import Customcursor from "./components/Customcursor";
import Home from "./sections/Home";
import Contact from "./sections/contact";
import Experience from "./sections/experience";
import Skills from "./sections/skills";
import Footer from "./sections/footer";
import Testmonials from "./sections/testimonials";
import React from "react";
import Introanimation from "./components/Introanimation";




export default function App() {
  const [introDone , setIntroDone]= React.useState(false);
  return (
    <>
    {!introDone && <Introanimation onFinish={()=> setIntroDone(true)} />}

      {introDone && (
    <div className="relative gradient text-white">
      <Customcursor />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Experience />
      <Testmonials />
      <Contact />
      <Footer />
    </div>
       )}
    </>
  );
}
