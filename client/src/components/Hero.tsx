
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-grubzap-dark to-grubzap-dark/80 text-white py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/44d718c2-c665-4c4a-b504-d07049172178.png')] opacity-10 bg-repeat"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Delicious Food, 
            <span className="bg-clip-text text-transparent bg-orange-gradient block mt-2"> 
              Delivered <span className="hidden md:inline">Super </span>Fast
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Order from your favorite local restaurants with just a few taps and get your food delivered to your doorstep.
          </p>
          <div className="relative max-w-lg mx-auto">
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">
              <Search className="h-5 w-5 text-gray-400 ml-4" />
              <input 
                type="text" 
                placeholder="Search for food or restaurants..." 
                className="py-4 px-3 w-full text-gray-800 focus:outline-none rounded-full"
              />
              <Button className="m-1 bg-grubzap-orange hover:bg-grubzap-darkOrange rounded-full px-6">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
