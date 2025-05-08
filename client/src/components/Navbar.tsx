import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, Search } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = localStorage.getItem("grubzap-cart");
        if (storedCart) {
          const cart = JSON.parse(storedCart);
          setCartCount(cart.length);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("Error reading cart from localStorage:", error);
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/grubzap logo.png"
              alt="GrubZap Logo"
              className="h-14 md:h-16 w-auto animate-float"
            />
            <span className="font-display font-bold text-2xl md:text-3xl text-grubzap-dark">
              Grub<span className="text-grubzap-orange">Zap</span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-grubzap-orange transition-colors">Home</Link>
          <Link to="/menu" className="font-medium hover:text-grubzap-orange transition-colors">Menu</Link>
          <Link to="/restaurants" className="font-medium hover:text-grubzap-orange transition-colors">Restaurants</Link>
          <Link to="/about" className="font-medium hover:text-grubzap-orange transition-colors">About</Link>
          <Link to="/contact" className="font-medium hover:text-grubzap-orange transition-colors">Contact</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" className="hidden md:flex" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="relative"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
          >
            <Link to="/cart" className="relative">
  <Button size="icon" variant="outline" aria-label="Cart">
    <ShoppingCart className="h-5 w-5 text-grubzap-dark" />
    {cartCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-grubzap-red text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </Button>
</Link>

          </Button>
          <Link to="/login">
            <Button className="hidden md:flex bg-grubzap-orange hover:bg-grubzap-darkOrange">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="hidden md:flex bg-grubzap-orange hover:bg-grubzap-darkOrange">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Home</Link>
              <Link to="/menu" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Menu</Link>
              <Link to="/restaurants" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Restaurants</Link>
              <Link to="/about" className="font-medium py-2 hover:text-grubzap-orange transition-colors">About</Link>
              <Link to="/contact" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Contact</Link>
              <Link to="/cart" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Cart</Link>
              <Link to="/login" className="w-full">
                <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full mt-2">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full mt-2">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
