import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, ArrowUp, X } from "lucide-react";

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

  const handleCloseBot = () => {
    setIsRobotOpen(false);
    setMessages([{ sender: 'bot', text: 'Hey there! How are you feeling today? 😄' }]);
  };

  return (
    <footer className="bg-grubzap-dark text-gray-300 relative">
      {/* Your existing footer content (branding, quick links, etc.) */}
      
      {/* Scroll & Chatbot buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
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

      {/* Chatbot popup */}
      {isRobotOpen && (
        <div className="fixed bottom-28 right-6 w-80 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col z-50">
          <div className="bg-grubzap-orange text-white p-4 flex justify-between items-center">
            <h4 className="font-bold">GrubZap Assistant</h4>
            <button onClick={handleCloseBot}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col p-4 gap-2 max-h-80 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm p-2 rounded-lg ${
                  msg.sender === 'bot' ? 'bg-gray-100 text-gray-800 self-start' : 'bg-grubzap-orange text-white self-end'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex flex-wrap gap-2">
            {['happy', 'sad', 'hungry', 'tired', 'other'].map((mood) => (
              <Button
                key={mood}
                onClick={() => handleMoodSelection(mood)}
                variant="outline"
                className="text-xs px-3 py-1"
              >
                {mood}
              </Button>
            ))}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
