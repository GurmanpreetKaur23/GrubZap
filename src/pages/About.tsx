
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    id: 1,
    name: "Gurmanpreet Kaur",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    description: "Sarah founded GrubZap in 2020 with a mission to make food delivery more accessible and efficient."
  },
  
  {
    id: 2,
    name: "Gurnimrat Singh",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    description: "Priya ensures that GrubZap operations run smoothly and efficiently across all our service areas."
  },
  {
    id: 3,
    name: "Guntas Singh",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    description: "David crafts our brand strategy and handles all marketing initiatives to grow the GrubZap community."
  }
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-grubzap-dark to-grubzap-dark/80 text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About GrubZap</h1>
            <p className="text-lg max-w-2xl mx-auto text-center text-white/80">
              Our journey, mission, and the team behind your favorite food delivery service.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-grubzap-dark">Our Story</h2>
              <p className="text-gray-600 mb-4">
                GrubZap was founded in 2025 with a simple mission: to connect hungry people with delicious food from local restaurants, delivered quickly and efficiently.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small operation in one city has grown into a nationwide service, connecting thousands of restaurants with millions of food lovers across the country.
              </p>
              <p className="text-gray-600">
                Our innovative technology, dedicated delivery partners, and customer-centric approach have made us a leader in the food delivery industry.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" 
                alt="GrubZap office" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-grubzap-dark">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-grubzap-orange/10 border-none">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🍔</div>
                  <h3 className="font-bold text-xl mb-2 text-grubzap-dark">Support Local</h3>
                  <p className="text-gray-600">
                    We empower local restaurants by expanding their reach and customer base through our platform.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-grubzap-yellow/10 border-none">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="font-bold text-xl mb-2 text-grubzap-dark">Fast Delivery</h3>
                  <p className="text-gray-600">
                    Our efficient delivery network ensures your food arrives hot and fresh, right when you need it.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-100 border-none">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🌱</div>
                  <h3 className="font-bold text-xl mb-2 text-grubzap-dark">Sustainability</h3>
                  <p className="text-gray-600">
                    We're committed to reducing our environmental impact through eco-friendly packaging and practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-grubzap-dark">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden card-hover border-gray-100">
                  <div className="h-64">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-grubzap-orange font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
