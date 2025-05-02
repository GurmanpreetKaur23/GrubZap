
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const restaurants = [
  {
    id: 1,
    name: "Pizza Paradise",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    cuisine: "Italian",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    featured: true
  },
  {
    id: 2,
    name: "Burger Bliss",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "15-25 min",
    deliveryFee: "$1.99",
    featured: false
  },
  {
    id: 3,
    name: "Sushi Supreme",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "25-35 min",
    deliveryFee: "$3.99",
    featured: true
  },
  {
    id: 4,
    name: "Taco Town",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    cuisine: "Mexican",
    rating: 4.7,
    deliveryTime: "15-25 min",
    deliveryFee: "$2.49",
    featured: false
  }
];

const FeaturedRestaurants = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-grubzap-dark">
            Featured <span className="text-grubzap-orange">Restaurants</span>
          </h2>
          <a href="#" className="text-grubzap-orange font-medium hover:underline">
            View All
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <CardContent className="pt-4 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-grubzap-dark">{restaurant.name}</h3>
                    <p className="text-gray-500">{restaurant.cuisine}</p>
                  </div>
                  <div className="flex items-center bg-grubzap-yellow/20 px-2 py-1 rounded">
                    <Star className="h-4 w-4 fill-grubzap-yellow text-grubzap-yellow mr-1" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="py-2 border-t border-gray-100 flex justify-between text-sm text-gray-500">
                <span>🕒 {restaurant.deliveryTime}</span>
                <span>🚚 {restaurant.deliveryFee}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
