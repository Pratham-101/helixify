import React from "react";

const Contacts = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-8">
      <div className="w-full lg:w-3/4 space-y-4 text-center">
        <h1 className="text-4xl font-semibold">Contact Us</h1>
        <p className="text-lg">
          We’re here to assist you with all your medical queries and appointment bookings. Get in touch with our dedicated team for accurate diagnostics and health advice. Whether you have questions about our services or need help scheduling an appointment, we’re just a message or a call away.
        </p>
      </div>
      
      <div className="w-full lg:w-3/4 space-y-6">
        <form className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <input 
              type="text" 
              className="border border-gray-300 p-3 rounded-lg w-full" 
              placeholder="Your Name" 
              required 
            />
            <input 
              type="email" 
              className="border border-gray-300 p-3 rounded-lg w-full" 
              placeholder="Your Email" 
              required 
            />
          </div>
          <textarea 
            className="border border-gray-300 p-3 rounded-lg w-full" 
            rows="5" 
            placeholder="Your Message" 
            required 
          ></textarea>
          <button 
            type="submit" 
            className="bg-[#2c7a7b] text-white py-3 px-8 rounded-lg hover:bg-[#285e61] transition duration-300 w-full lg:w-auto"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="w-full lg:w-3/4 text-center">
        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <p>Phone: +91 8432929101</p>
        <p>Email: contact@helixify.com</p>
        <p>Address: Somaiya University</p>
      </div>
    </div>
  );
};

export default Contacts;
