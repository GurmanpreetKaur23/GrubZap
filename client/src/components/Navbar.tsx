import { Link } from "react-router-dom"; // Keep this if you're using React Router

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>

          {/* Keep using Link for navigation */}
          <Link to="/" className="flex items-center gap-2">
            <img src="src/components/grubzap logo.png" alt="GrubZap Logo" className="h-14 md:h-16 w-auto animate-float" />
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
                <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full mt-2">Sign In</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
