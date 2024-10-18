import React from "react";
import { Link } from "react-scroll";
import Button from "../layouts/Button";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center lg:px-32 px-5 bg-[url('assets/img/home.png')] bg-no-repeat bg-cover">
      {/* Background overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 w-full lg:w-4/5 space-y-5 mt-10 text-white">
        <h1 className="text-5xl font-bold leading-tight drop-shadow-lg">
          Welcome to Helixify: Your Partner in Health and Wellness
        </h1>
        <p className="text-xl drop-shadow-md">
          At Helixify, we are dedicated to providing you with cutting-edge diagnostics and personalized care to help you make informed health decisions. Our state-of-the-art facilities and expert team ensure that you receive accurate results and actionable insights for a healthier, more vibrant life.
        </p>

        {/* Additional margin for the button to move it lower */}
        <div className="mt-8">
          <Link
            to="services"
            spy={true}
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <Button title="Explore Our Services" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
