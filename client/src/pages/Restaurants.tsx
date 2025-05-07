
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Phone } from "lucide-react";

const restaurants = [
  {
    id: 1,
    name: "Pizza Paradise",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    cuisine: "Italian",
    rating: 4.8,
    reviewCount: 243,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    location: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    featured: true
  },
  {
    id: 2,
    name: "Burger Bliss",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    cuisine: "American",
    rating: 4.5,
    reviewCount: 187,
    deliveryTime: "15-25 min",
    deliveryFee: "$1.99",
    location: "456 Oak Avenue, Westside",
    phone: "(555) 234-5678",
    featured: false
  },
  {
    id: 3,
    name: "Sushi Supreme",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    cuisine: "Japanese",
    rating: 4.9,
    reviewCount: 312,
    deliveryTime: "25-35 min",
    deliveryFee: "$3.99",
    location: "789 Pine Street, Eastside",
    phone: "(555) 345-6789",
    featured: true
  },
  {
    id: 4,
    name: "Taco Town",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    cuisine: "Mexican",
    rating: 4.7,
    reviewCount: 156,
    deliveryTime: "15-25 min",
    deliveryFee: "$2.49",
    location: "101 Maple Road, Southside",
    phone: "(555) 456-7890",
    featured: false
  },
  {
    id: 5,
    name: "Curry House",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    cuisine: "Indian",
    rating: 4.6,
    reviewCount: 198,
    deliveryTime: "30-40 min",
    deliveryFee: "$2.99",
    location: "202 Cedar Street, Northside",
    phone: "(555) 567-8901",
    featured: false
  },
  {
    id: 6,
    name: "Green Garden",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    cuisine: "Vegetarian",
    rating: 4.4,
    reviewCount: 142,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    location: "303 Birch Avenue, Midtown",
    phone: "(555) 678-9012",
    featured: false
  }
];

const Restaurants = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-grubzap-dark to-grubzap-dark/80 text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Restaurants</h1>
            <p className="text-lg max-w-2xl mx-auto text-center text-white/80">
              Discover the best local restaurants in your area. From fast food to fine dining, we've got you covered.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden card-hover border-gray-100">
                <div className="relative h-48">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  {restaurant.featured && (
                    <Badge className="absolute top-3 left-3 bg-grubzap-orange border-none">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-grubzap-dark">{restaurant.name}</h3>
                      <p className="text-gray-500">{restaurant.cuisine}</p>
                    </div>
                    <div className="flex items-center bg-grubzap-yellow/20 px-2 py-1 rounded">
                      <Star className="h-4 w-4 fill-grubzap-yellow text-grubzap-yellow mr-1" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({restaurant.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Delivery: {restaurant.deliveryTime}</span>
                      <span className="mx-2">•</span>
                      <span>Fee: {restaurant.deliveryFee}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{restaurant.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{restaurant.phone}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                  <button className="bg-grubzap-orange hover:bg-grubzap-darkOrange text-white rounded-md px-4 py-2 w-full font-medium">
                    View Menu
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Restaurants;
