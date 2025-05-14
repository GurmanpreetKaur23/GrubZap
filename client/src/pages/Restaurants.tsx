import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Star, Clock, MapPin, Phone } from 'lucide-react';

const DEFAULT_LOCATION = {
  latitude: 40.7128,
  longitude: -74.0060,
};

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. Showing default location.');
      fetchRestaurants(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchRestaurants(latitude, longitude);
      },
      (error) => {
        setLocationError('Unable to retrieve your location. Showing default location.');
        fetchRestaurants(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
      }
    );
  }, []);

  const fetchRestaurants = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `/by-location?latitude=${latitude}&longitude=${longitude}&radius=10`
      );
      const result = await response.json();
      if (result.success && result.data) {
        const formattedRestaurants = result.data.map((restaurant) => ({
          id: restaurant._id,
          name: restaurant.name,
          image: restaurant.image || 'https://via.placeholder.com/400',
          cuisine: restaurant.cuisine || 'N/A',
          rating: restaurant.rating || 'N/A',
          reviewCount: restaurant.reviewCount || 0,
          deliveryTime: restaurant.deliveryTime || 'N/A',
          deliveryFee: restaurant.deliveryFee || 'N/A',
          location: restaurant.location?.address || 'N/A',
          phone: restaurant.phone || 'N/A',
          featured: restaurant.featured || false,
        }));
        setRestaurants(formattedRestaurants);
        setLocationError(null);
      } else {
        setLocationError('No restaurants found near your location.');
      }
    } catch (error) {
      setLocationError('Error fetching restaurant data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-grubzap-dark to-grubzap-dark/80 text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Nearby Restaurants</h1>
            <p className="text-lg max-w-2xl mx-auto text-center text-white/80">
              Discover the best local restaurants near you. From fast food to fine dining, we've got you covered.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-12">
          {loading ? (
            <p className="text-center text-gray-600">Loading restaurants...</p>
          ) : locationError ? (
            <p className="text-center text-red-600">{locationError}</p>
          ) : (
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Restaurants;
