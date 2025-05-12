import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const restaurants = [
  {
    id: 1,
    name: "Domino's",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4sYCAwWE13OOMMX0_y8Ht_lOfyPh899V-A&s",
    cuisine: "Italian",
    rating: 4.8,
    deliveryTime: "30-40 min",
    deliveryFee: "₹99",
    featured: true,
    category: "Pizza",
    vegOrNonVeg: "Non-Veg & Veg"
  },
  {
    id: 2,
    name: "McDonald's",
    image: "https://usimg.sulekha.io/cdn/others/images/extra-value-meal_2024-11-28-01-32-46-962.png",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: "₹70",
    featured: false,
    vegOrNonVeg: "Non-Veg & Veg"
  },
  {
    id: 3,
    name: "KFC",
    image: "https://b.zmtcdn.com/data/pictures/chains/5/67755/24697b617bb8aaf5b1c7df9a7074a662.jpg?fit=around|960:500&crop=960:500;*,*",
    cuisine: "American",
    rating: 4.9,
    deliveryTime: "25-35 min",
    deliveryFee: "₹120",
    featured: true,
    vegOrNonVeg: "Non-Veg"
  },
  {
    id: 4,
    name: "Taco Bell",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUrO8fZzqyhcLJ4Drm-9nozknExmquvjgPHw&s",
    cuisine: "Mexican",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: "₹99",
    featured: false,
    vegOrNonVeg: "Non-Veg & Veg"
  },
  {
    id: 5,
    name: "Sagar Ratna",
    image: "https://b.zmtcdn.com/data/pictures/chains/8/18597388/48ea07840f0b37f6574b4263083a225a.jpg",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: "₹80",
    featured: true,
    vegOrNonVeg: "Veg"
  },
  {
    id: 6,
    name: "Starbucks",
    image: "https://assets.gqindia.com/photos/5cdc75d38e62990b13f38389/4:3/w_1440,h_1080,c_limit/starbucks-cup-hed-2013.jpg",
    cuisine: "Coffee & Beverages",
    rating: 4.7,
    deliveryTime: "25-35 min",
    deliveryFee: "₹100",
    featured: false,
    vegOrNonVeg: "Non-Veg & Veg"
  },
  {
    id: 7,
    name: "Bikanervala",
    image: "https://www.rahein.com/images/bikanervala/snacks/south_india_offerings_rahein.png",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "15-25 min",
    deliveryFee: "₹75",
    featured: false,
    vegOrNonVeg: "Veg"
  },
  {
    id: 8,
    name: "Wow Momo",
    image: "https://d4t7t8y8xqo0t.cloudfront.net/app//resized/818X450/group/3502/menu020230613093622.jpg",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: "₹50",
    featured: false,
    vegOrNonVeg: "Non-Veg & Veg"
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
                    <span className="text-sm font-medium mt-1 block">
                      {restaurant.vegOrNonVeg === 'Veg' && (
                        <span className="text-green-600">🟢 Veg</span>
                      )}
                      {restaurant.vegOrNonVeg === 'Non-Veg' && (
                        <span className="text-red-600">🔴 Non-Veg</span>
                      )}
                      {restaurant.vegOrNonVeg === 'Non-Veg & Veg' && (
                        <span className="text-yellow-700">🟢🔴 Veg & Non-Veg</span>
                      )}
                    </span>
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
