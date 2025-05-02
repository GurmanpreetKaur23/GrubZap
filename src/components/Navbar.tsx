
import React from 'react';
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> 1ffaba8 (feat: Implement food ordering website theme)
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, Search } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
<<<<<<< HEAD
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="src\components\grubzap logo.png" 
              alt="GrubZap Logo" 
              className="h-14 md:h-16 w-auto animate-float" 
            />
            <span className="font-display font-bold text-2xl md:text-3xl text-grubzap-dark">
              Grub<span className="text-grubzap-orange">Zap</span>
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-grubzap-orange transition-colors">Home</Link>
          <Link to="/menu" className="font-medium hover:text-grubzap-orange transition-colors">Menu</Link>
          <Link to="/restaurants" className="font-medium hover:text-grubzap-orange transition-colors">Restaurants</Link>
          <Link to="/about" className="font-medium hover:text-grubzap-orange transition-colors">About</Link>
          <Link to="/contact" className="font-medium hover:text-grubzap-orange transition-colors">Contact</Link>
=======
          <a href="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/44d718c2-c665-4c4a-b504-d07049172178.png" 
              alt="GrubZap Logo" 
              className="h-14 md:h-16 w-auto animate-float" 
            />
            <span className="font-display font-bold text-2xl md:text-3xl text-grubzap-dark">
              Grub<span className="text-grubzap-orange">Zap</span>
            </span>
          </a>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="font-medium hover:text-grubzap-orange transition-colors">Home</a>
          <a href="#" className="font-medium hover:text-grubzap-orange transition-colors">Menu</a>
          <a href="#" className="font-medium hover:text-grubzap-orange transition-colors">Restaurants</a>
          <a href="#" className="font-medium hover:text-grubzap-orange transition-colors">About</a>
          <a href="#" className="font-medium hover:text-grubzap-orange transition-colors">Contact</a>
>>>>>>> 1ffaba8 (feat: Implement food ordering website theme)
        </div>
        
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="outline" className="relative">
            <ShoppingCart className="h-5 w-5 text-grubzap-dark" />
            <span className="absolute -top-1 -right-1 bg-grubzap-red text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">2</span>
          </Button>
          <Button className="hidden md:flex bg-grubzap-orange hover:bg-grubzap-darkOrange">
            Sign In
          </Button>
<<<<<<< HEAD
          <Button className="hidden md:flex bg-grubzap-orange hover:bg-grubzap-darkOrange">
            Sign Up
          </Button>
=======
>>>>>>> 1ffaba8 (feat: Implement food ordering website theme)
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-3">
<<<<<<< HEAD
              <Link to="/" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Home</Link>
              <Link to="/menu" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Menu</Link>
              <Link to="/restaurants" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Restaurants</Link>
              <Link to="/about" className="font-medium py-2 hover:text-grubzap-orange transition-colors">About</Link>
              <Link to="/contact" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Contact</Link>
=======
              <a href="/" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Home</a>
              <a href="#" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Menu</a>
              <a href="#" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Restaurants</a>
              <a href="#" className="font-medium py-2 hover:text-grubzap-orange transition-colors">About</a>
              <a href="#" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Contact</a>
>>>>>>> 1ffaba8 (feat: Implement food ordering website theme)
              <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full mt-2">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
