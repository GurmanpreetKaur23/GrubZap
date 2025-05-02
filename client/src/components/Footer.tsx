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
        {/* ... the rest of the original footer content ... */}

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
