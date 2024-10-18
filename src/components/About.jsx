import React from "react";
import img from "../assets/img/about.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className="w-full lg:w-3/4 space-y-4">
        <h1 className="text-4xl font-semibold text-center lg:text-start">About Us</h1>
        <p className="text-justify lg:text-start">
          At our state-of-the-art pathology lab, we are committed to providing accurate and timely disease detection services. Our advanced diagnostic technology allows us to identify a wide range of conditions, ensuring that you receive the right diagnosis and care as quickly as possible.
        </p>
        <p className="text-justify lg:text-start">
          Along with delivering detailed medical reports, we go beyond just diagnosing diseases. We provide personalized lifestyle recommendations based on your health reports, helping you make informed decisions to improve your overall well-being. Whether it's diet, exercise, or preventive measures, our goal is to guide you toward a healthier lifestyle.
        </p>
        <p className="text-justify lg:text-start">
          Our team of experienced professionals is dedicated to ensuring that each patient receives the highest standard of care. From routine checkups to specialized tests, we are here to support your health journey with reliable diagnostics and expert advice. Your health is our priority, and we are here to empower you with the knowledge and tools you need for a healthier future.
        </p>
      </div>
      <div className="w-full lg:w-3/4">
        <img className="rounded-lg" src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;

