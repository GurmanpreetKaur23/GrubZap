import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, ArrowUp } from "lucide-react";

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isRobotOpen, setIsRobotOpen] = useState(false);

  return (
    <footer className="bg-grubzap-dark text-gray-300 relative">
      <div className="container mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/44d718c2-c665-4c4a-b504-d07049172178.png" 
                alt="GrubZap Logo" 
                className="h-10 w-auto" 
              />
              <span className="font-display font-bold text-xl text-white">
                Grub<span className="text-grubzap-orange">Zap</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Delivering happiness one meal at a time. Your favorite local restaurants at your fingertips.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-grubzap-orange transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-grubzap-orange transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-grubzap-orange transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-grubzap-orange transition-colors">Restaurants</a></li>
              <li><a href="#" className="hover:text-grubzap-orange transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-grubzap-orange transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-grubzap-orange transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-grubzap-orange transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-grubzap-orange transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-grubzap-orange transition-colors">Partner With Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">Subscribe to get exclusive offers and updates</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-grubzap-dark/60 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="bg-gray-700 my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 GrubZap. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <Button
          onClick={() => setIsRobotOpen(!isRobotOpen)}
          className="bg-grubzap-orange hover:bg-grubzap-darkOrange rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Button
          onClick={handleBackToTop}
          className="bg-gray-700 hover:bg-gray-600 rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          size="icon"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      </div>
      
      {isRobotOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-lg shadow-xl w-80 z-50">
          <div className="bg-grubzap-orange text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">GrubZap Assistant</h3>
            <button 
              onClick={() => setIsRobotOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="p-4 h-80 bg-gray-50 overflow-y-auto">
            <div className="bg-gray-200 rounded-lg p-3 mb-3 text-gray-800">
              Hi there! How can I help you with your order today?
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 flex gap-2">
            <Input 
              placeholder="Type your message..." 
              className="flex-1"
            />
            <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange">
              Send
            </Button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
