import React from "react";
import { FaDna, FaHeartbeat, FaAppleAlt } from 'react-icons/fa'; // Import existing FontAwesome icons
import { FaPrescriptionBottleAlt } from 'react-icons/fa';

const ServicesCard = ({ icon, title, description }) => {
  return (
    <div className="group flex flex-col items-center text-center gap-2 w-full lg:w-1/3 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer lg:hover:-translate-y-6 transition duration-300 ease-in-out">
      <div className="bg-[#d5f2ec] p-3 rounded-full transition-colors duration-300 ease-in-out group-hover:bg-[#ade9dc]">
        {icon}
      </div>
      <h1 className="font-semibold text-lg">{title}</h1>
      <p>{description}</p>
      
    </div>
  );
};

const Services = () => {
  // Define new icon
  const icon4 = <FaPrescriptionBottleAlt size={35} className="text-backgroundColor" />;

  return (
    <div className="pt-14">
      {/* Aligned heading */}
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-4xl font-bold">Our Services</h2>
        <p className="mt-2 text-lg">
          Explore how we can help you make informed decisions about your health.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <ServicesCard 
          icon={<FaDna size={40} />} 
          title="DNA Sequencing" 
          description="DNA sequencing identifies the exact order of nucleotides, essential for understanding genetic makeup and hereditary information." 
        />
        <ServicesCard 
          icon={<FaHeartbeat size={40} />} 
          title="Disease Predictions" 
          description="By analyzing genetic variations, DNA sequencing helps predict the likelihood of developing specific diseases and conditions." 
        />
        <ServicesCard 
          icon={icon4} // Use the new icon here
          title="Drug Recommendations" 
          description="Personalized drug recommendations are based on your genetic profile, optimizing treatment plans for better health outcomes." 
        />
        <ServicesCard 
          icon={<FaAppleAlt size={40} />} 
          title="Lifestyle Changes" 
          description="Genetic insights can guide lifestyle changes, helping you make informed decisions to improve health and well-being." 
        />
      </div>
    </div>
  );
};

export default Services;
