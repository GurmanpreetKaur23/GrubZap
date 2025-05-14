import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart, Menu, Search, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("grubzap-cart") || "[]");
        setCartCount(Array.isArray(storedCart) ? storedCart.length : 0);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/login");
    window.location.reload();
  };

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
    setSearchQuery("");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
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
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-medium hover:text-grubzap-orange transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
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
            <Button
              size="icon"
              variant="ghost"
              className="hidden md:flex"
              onClick={handleSearchToggle}
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Button
            size="icon"
            variant="outline"
            className="relative"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
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
                <Button className="hidden md:flex bg-grubzap-orange hover:bg-grubzap-darkOrange">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="hidden md:flex bg-grubzap-orange hover:bg-grubzap-darkOrange">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="hidden md:flex h-10 w-10 rounded-full bg-grubzap-orange text-white items-center justify-center"
                aria-label="User menu"
              >
                <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-12 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-grubzap-orange hover:text-white rounded-t-md"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-grubzap-orange hover:text-white rounded-b-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-medium py-2 hover:text-grubzap-orange transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/cart"
                className="font-medium py-2 hover:text-grubzap-orange transition-colors"
              >
                Cart
              </Link>
              {!isLoggedIn ? (
                <>
                  <Link to="/login">
                    <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full mt-2">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full mt-2">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full mt-2 py-2 rounded-md text-white font-bold flex justify-center"
                    aria-label="User menu"
                  >
                    <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
                  </button>
                  {isDropdownOpen && (
                    <div className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-grubzap-orange hover:text-white rounded-t-md"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-grubzap-orange hover:text-white rounded-b-md"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
