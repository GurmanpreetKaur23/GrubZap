import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Restaurant type definition
type Restaurant = {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: string;
  location: string;
  featured: boolean;
};

// Fetch restaurants using Foodish API and mock metadata
const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const imageResponse = await fetch('https://foodish-api.com/api/images');
    const { image } = await imageResponse.json();

    // Generate mock restaurants using the fetched image
    const mockRestaurants: Restaurant[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i + 1,
      name: `Foodish Delight ${i + 1}`,
      image,
      cuisine: ["Italian", "Indian", "Chinese", "Mexican", "American", "Thai"][i % 6],
      rating: (4 + Math.random()).toFixed(1) as unknown as number,
      reviewCount: Math.floor(Math.random() * 300),
      deliveryTime: `${15 + i * 5}-${20 + i * 5} min`,
      deliveryFee: `$${(1 + i * 0.5).toFixed(2)}`,
      location: `Area ${i + 1}, City Center`,
      featured: i % 2 === 0
    }));

    return mockRestaurants;
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    throw new Error('Failed to fetch restaurant data');
  }
};

const ProductLanding = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: restaurants, isLoading, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
  });

  useEffect(() => {
    if (restaurants) {
      if (!searchQuery) {
        setFilteredRestaurants(restaurants);
      } else {
        const filtered = restaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRestaurants(filtered);
      }
    }
  }, [restaurants, searchQuery]);

  const handleRestaurantClick = (restaurantId: number) => {
    navigate(`/menu?restaurant=${restaurantId}`);
    toast({
      title: 'Restaurant selected',
      description: 'Loading menu items for this restaurant...',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gray-100 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-6 text-grubzap-dark">
              Discover Delicious <span className="text-grubzap-orange">Food</span>
            </h1>
            <div className="flex justify-center mb-10">
              <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg w-full max-w-xl">
                <MapPin className="h-5 w-5 text-gray-400 ml-4" />
                <Input
                  type="text"
                  placeholder="Enter your location or restaurant name..."
                  className="py-4 px-3 w-full text-gray-800 focus:outline-none border-none rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="m-1 bg-grubzap-orange hover:bg-grubzap-darkOrange rounded-full px-6">
                  Search
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden border-gray-100">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/3" />
                    </CardContent>
                    <CardFooter className="p-4">
                      <Skeleton className="h-10 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center text-red-600">Failed to load restaurants.</div>
            ) : filteredRestaurants.length === 0 ? (
              <div className="text-center text-gray-600">No restaurants found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <Card
                    key={restaurant.id}
                    className="overflow-hidden card-hover border-gray-100 cursor-pointer"
                    onClick={() => handleRestaurantClick(restaurant.id)}
                  >
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
                          <span>Delivery: {restaurant.deliveryTime}</span>
                          <span className="mx-2">•</span>
                          <span>Fee: {restaurant.deliveryFee}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{restaurant.location}</span>
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductLanding;
