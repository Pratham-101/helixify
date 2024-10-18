import React from "react";
import img1 from "../assets/img/blog1.jpg";
import img2 from "../assets/img/blog2.jpg";
import img3 from "../assets/img/blog3.jpg";
import img4 from "../assets/img/blog4.jpg";
import img5 from "../assets/img/blog5.jpg";
import img6 from "../assets/img/blog6.jpg";

// BlogCard component
const BlogCard = ({ img, headlines, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80">
      <img src={img} alt={headlines} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{headlines}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

// Blogs component
const Blogs = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24">
      <div className="flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Latest Post
          </h1>
          <p className="mt-2 text-center lg:text-start">
            Explore the latest advancements in personalized healthcare through DNA-based analysis, offering actionable insights for disease prevention and tailored health recommendations.
          </p>
        </div>
      </div>
      <div className="my-8">
        <div className="flex flex-wrap justify-center gap-5">
          <BlogCard 
            img={img1} 
            headlines="Unraveling the Mysteries of Sleep" 
            description="Discover how sleep impacts your genetic makeup and its essential role in maintaining physical and mental well-being." 
          />
          <BlogCard 
            img={img2} 
            headlines="The Heart-Healthy Diet" 
            description="Learn how personalized nutrition based on your DNA can improve heart health and reduce the risk of cardiovascular diseases." 
          />
          <BlogCard 
            img={img3} 
            headlines="Understanding Pediatric Vaccinations"
            description="Explore the role of vaccines in children’s health and how genetic factors can influence immune responses." 
          />
          <BlogCard 
            img={img4} 
            headlines="Navigating Mental Health" 
            description="Uncover the genetic links to mental health disorders and how DNA analysis can offer personalized treatment options."
          />
          <BlogCard 
            img={img5} 
            headlines="The Importance of Regular Exercise" 
            description="See how your genetic profile can influence your fitness journey and help optimize exercise routines for better health." 
          />
          <BlogCard 
            img={img6} 
            headlines="Skin Health 101" 
            description="Understand how your genes affect skin aging, and how personalized skincare can help you achieve healthier skin." 
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
