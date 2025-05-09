import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, Search, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("grubzap-cart"));
        setCartCount(storedCart?.length || 0);
      } catch (error) {
        console.error("Cart error:", error);
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("jwtToken"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Discover", path: "/productlanding" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo and Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <img src="/grubzap logo.png" alt="GrubZap Logo" className="h-14 md:h-16 w-auto animate-float" />
            <span className="font-display font-bold text-2xl md:text-3xl text-grubzap-dark">
              Grub<span className="text-grubzap-orange">Zap</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="font-medium hover:text-grubzap-orange transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search, Cart, and Auth Buttons */}
        <div className="flex items-center gap-3">
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="border px-2 py-1 rounded-md focus:ring-2 focus:ring-grubzap-orange"
              />
              <Button variant="ghost" size="icon" onClick={handleSearchToggle}>
                <X className="h-5 w-5" />
              </Button>
            </form>
          ) : (
            <Button size="icon" variant="ghost" className="hidden md:flex" onClick={handleSearchToggle}>
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Button
            size="icon"
            variant="outline"
            className="relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5 text-grubzap-dark" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-grubzap-red text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <Button className="hidden md:flex bg-grubzap-orange hover:bg-grubzap-darkOrange">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="hidden md:flex bg-grubzap-orange hover:bg-grubzap-darkOrange">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Button className="hidden md:flex bg-grubzap-orange hover:bg-grubzap-darkOrange" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="font-medium py-2 hover:text-grubzap-orange transition-colors">
                  {link.name}
                </Link>
              ))}
              <Link to="/cart" className="font-medium py-2 hover:text-grubzap-orange transition-colors">Cart</Link>
              {!isLoggedIn ? (
                <>
                  <Link to="/login">
                    <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full mt-2">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full mt-2">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full mt-2" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
