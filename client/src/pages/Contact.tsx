
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Contact form submitted');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-grubzap-dark to-grubzap-dark/80 text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Contact Us</h1>
            <p className="text-lg max-w-2xl mx-auto text-center text-white/80">
              Have questions, feedback, or need assistance? We're here to help!
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-grubzap-dark">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" type="text" placeholder="What's this about?" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us how we can help..." 
                    className="mt-1 min-h-32"
                  />
                </div>
                <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange w-full">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-grubzap-dark">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-6">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-grubzap-orange mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 765-4321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-grubzap-orange mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">info@grubzap.com</p>
                    <p className="text-gray-600">support@grubzap.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-grubzap-orange mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">
                      123 Delivery Street<br />
                      Foodville, CA 90210<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-grubzap-orange mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9am - 8pm</p>
                    <p className="text-gray-600">Saturday: 10am - 6pm</p>
                    <p className="text-gray-600">Sunday: 10am - 4pm</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 h-64 bg-gray-200 rounded-lg overflow-hidden">
                {/* Map would go here - placeholder for now */}
                <div className="h-full w-full flex items-center justify-center">
                  <p className="text-gray-500">Google Maps Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
