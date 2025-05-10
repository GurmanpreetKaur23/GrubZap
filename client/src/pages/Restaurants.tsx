import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Star, Clock, MapPin, Phone } from 'lucide-react';

// Replace with your actual Google Places API key
const GOOGLE_PLACES_API_KEY = 'AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao';

// Default fallback location (e.g., New York City)
const DEFAULT_LOCATION = {
  latitude: 40.7128,
  longitude: -74.0060,
};

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // Check if Geolocation is supported
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. Showing default location.');
      fetchRestaurants(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
      return;
    }

    // Get user's current position
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
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=restaurant&key=${GOOGLE_PLACES_API_KEY}`
      );

      const data = await response.json();
      if (data.results) {
        const formattedRestaurants = data.results.map((place, index) => ({
          id: index,
          name: place.name,
          image: place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
            : 'https://via.placeholder.com/400',
          cuisine: place.types ? place.types.join(', ') : 'N/A',
          rating: place.rating || 'N/A',
          reviewCount: place.user_ratings_total || 0,
          deliveryTime: 'N/A',
          deliveryFee: 'N/A',
          location: place.vicinity || 'N/A',
          phone: 'N/A',
          featured: false,
        }));
        setRestaurants(formattedRestaurants);
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
