import React from "react";

const BannerHero: React.FC = () => {

  return (
    <div
      className="hero h-[40vh] md:h-[50vh] lg:h-[60vh]"
      style={{
        backgroundImage:
          "url(/banners/banner2.jpg)",
      }}
    >
      <div className="hero-overlay bg-black/50"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <img src="Logo.png" className="mx-auto"/>
          <h1 className="mb-5 text-5xl font-bold">The Tech Hub</h1>
          <p className="mb-5 leading-relaxed">
            All the tech you need in one hub.
            <br />
            <span className="hidden md:block text-center whitespace-normal md:whitespace-nowrap">
              <span>Your one-stop for all latest and essential tech.</span>
               <br />
              <span>
                 <span className="p-1">Discover the latest <br/></span> 
                <span className="text-rotate">
                   <span className="justify-items-center">
                    <span className="bg-teal-400 text-white px-2">Computers</span>
                    <span className="bg-blue-400 text-white px-2">Mobile & Wearables</span>
                    <span className="bg-teal-400 text-white px-2">TV & Audio</span>
                    <span className="bg-blue-400 text-white px-2">Drones & Gadgets</span>
                    <span className="bg-teal-400 text-white px-2">Accessories</span>
                    <span className="bg-blue-400 text-white px-2">Gaming</span>
                  </span>
                </span>
              </span>
            </span>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default BannerHero;