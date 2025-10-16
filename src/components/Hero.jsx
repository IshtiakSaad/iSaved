import React from "react";
import Logo from "../assets/logo.png";

const Hero = () => {
  return (
    <div>
      <div className="flex flex-row justify-center">
        <img src={Logo} className="w-8 h-8 lg:w-12 lg:h-12" />
        <h1 className="text-3xl md:text-5xl font-semibold text-center mb-8">
          iSaved
        </h1>
      </div>
      <div className="max-w-4xl mx-auto text-center mb-6 text-gray-500 text-xs">
        <p>
          Every Mac looks perfect. But only one is perfect for{" "}
          <span className="italic">You</span>. Find which Mac truly matches your
          purpose. Because every Apple product has a story. We help you find
          yours. So, discover your perfect Mac. Not by hype. By specs that match
          your vision and know exactly what you’re paying for, and what you’re
          not.
        </p>
      </div>
    </div>
  );
};

export default Hero;
