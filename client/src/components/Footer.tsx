import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, ArrowUp } from "lucide-react";

const Footer = () => {
  const [isRobotOpen, setIsRobotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey there! How are you feeling today? 😄' }
  ]);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMoodSelection = (mood) => {
    let botResponse = '';

    // Process mood and suggest food
    if (mood === 'happy') {
      botResponse = 'You seem to be in a great mood! How about some sweet treats like a chocolate cake or a refreshing smoothie? 🍰🥤';
    } else if (mood === 'sad') {
      botResponse = 'I’m sorry to hear that. Maybe a warm cup of coffee or a comforting bowl of pasta would help lift your spirits. ☕🍝';
    } else if (mood === 'hungry') {
      botResponse = 'Looks like you’re craving food! How about a burger or some crispy fries to satisfy your hunger? 🍔🍟';
    } else if (mood === 'tired') {
      botResponse = 'Sounds like you need a boost! How about some coffee or a light sandwich? ☕🥪';
    } else {
      botResponse = 'I’m not sure about your mood, but how about a delicious wrap or a refreshing mocktail to start? 🌯🥤';
    }

    const newMessages = [
      ...messages,
      { sender: 'user', text: `I'm feeling ${mood}` },
      { sender: 'bot', text: botResponse }
    ];

    setMessages(newMessages);
  };

  return (
    <footer className="bg-grubzap-dark text-gray-300 relative">
      <div className="container mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Footer content goes here */}
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
        
        {/* New Assistance Section */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Need more assistance? You can always reach out to us via email at 
            <a href="mailto:support@grubzap.com" className="text-grubzap-orange hover:underline"> gurbzap@gmail.com</a> 📧.
          </p>
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
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`p-3 mb-3 ${msg.sender === 'bot' ? 'bg-gray-200' : 'bg-blue-200'} rounded-lg`}
                >
                  <span className="text-gray-800">{msg.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
            <p className="text-sm text-gray-700">How are you feeling today?</p>
            <div className="flex gap-4">
              <Button onClick={() => handleMoodSelection('happy')} className="bg-grubzap-orange hover:bg-grubzap-darkOrange">
                Happy 😊
              </Button>
              <Button onClick={() => handleMoodSelection('sad')} className="bg-grubzap-orange hover:bg-grubzap-darkOrange">
                Sad 😞
              </Button>
            </div>
            <div className="flex gap-4 mt-2">
              <Button onClick={() => handleMoodSelection('hungry')} className="bg-grubzap-orange hover:bg-grubzap-darkOrange">
                Hungry 🍔
              </Button>
              <Button onClick={() => handleMoodSelection('tired')} className="bg-grubzap-orange hover:bg-grubzap-darkOrange">
                Tired 😴
              </Button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
