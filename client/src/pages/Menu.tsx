import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { MapPin } from 'lucide-react';

// This would normally come from an API based on location
const locations = [
  { id: 1, name: "Downtown" },
  { id: 2, name: "Westside" },
  { id: 3, name: "Eastside" },
  { id: 4, name: "Northside" },
  { id: 5, name: "Southside" }
];

const menuItems = [
  { 
    id: 1, 
    name: "Spicy Chicken Burger", 
    price: "$10.99", 
    description: "Juicy chicken patty with spicy sauce and fresh vegetables", 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    tag: "Bestseller",
    locations: [1, 2, 3]  // Available in Downtown, Westside, Eastside
  },
  { 
    id: 2, 
    name: "Veggie Supreme Pizza", 
    price: "$14.99", 
    description: "Loaded with bell peppers, mushrooms, olives, and onions", 
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    tag: "Vegetarian",
    locations: [1, 3, 4]  // Available in Downtown, Eastside, Northside
  },
  { 
    id: 3, 
    name: "Classic Beef Burger", 
    price: "$11.99", 
    description: "Juicy beef patty with cheese, lettuce, and special sauce", 
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
    tag: "",
    locations: [2, 3, 5]  // Available in Westside, Eastside, Southside
  },
  { 
    id: 4, 
    name: "Garlic Bread", 
    price: "$4.99", 
    description: "Crispy bread topped with garlic butter and herbs", 
    image: "https://images.unsplash.com/photo-1619535860434-da73a35c3763",
    tag: "",
    locations: [1, 2, 3, 4, 5]  // Available everywhere
  },
  { 
    id: 5, 
    name: "Loaded Nachos", 
    price: "$7.99", 
    description: "Crispy tortilla chips with cheese, jalapeños, and salsa", 
    image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063",
    tag: "Shareable",
    locations: [1, 4, 5]  // Available in Downtown, Northside, Southside
  },
  { 
    id: 6, 
    name: "Onion Rings", 
    price: "$5.99", 
    description: "Crispy, golden-brown onion rings with dipping sauce", 
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d",
    tag: "",
    locations: [2, 3, 5]  // Available in Westside, Eastside, Southside
  },
  { 
    id: 7, 
    name: "Margherita Pizza", 
    price: "$12.99", 
    description: "Classic pizza with tomato sauce, mozzarella, and basil", 
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
    tag: "Popular",
    locations: [1, 2, 3]  // Available in Downtown, Westside, Eastside
  },
  { 
    id: 8, 
    name: "Caesar Salad", 
    price: "$8.99", 
    description: "Fresh romaine lettuce with Caesar dressing and croutons", 
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
    tag: "Healthy",
    locations: [3, 4, 5]  // Available in Eastside, Northside, Southside
  },
  { 
    id: 9, 
    name: "Chocolate Sundae", 
    price: "$6.99", 
    description: "Vanilla ice cream with hot fudge and whipped cream", 
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    tag: "Dessert",
    locations: [1, 2, 4]  // Available in Downtown, Westside, Northside
  }
];

const categorizeMenuItems = (items) => {
  const categories = {
    "Popular Items": items.filter(item => item.tag === "Bestseller" || item.tag === "Popular"),
    "Main Dishes": items.filter(item => 
      item.name.includes("Burger") || 
      item.name.includes("Pizza") || 
      (!item.tag.includes("Dessert") && !item.name.includes("Bread") && !item.name.includes("Rings") && !item.name.includes("Nachos") && !item.name.includes("Salad"))
    ),
    "Sides & Starters": items.filter(item => 
      item.name.includes("Bread") || 
      item.name.includes("Rings") || 
      item.name.includes("Nachos") || 
      item.name.includes("Salad")
    ),
    "Desserts": items.filter(item => item.tag === "Dessert")
  };
  
  // Only include categories that have items
  return Object.fromEntries(
    Object.entries(categories).filter(([_, items]) => items.length > 0)
  );
};

const Menu = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Filter items based on location and search query
    let filtered = menuItems;
    
    if (selectedLocation) {
      filtered = filtered.filter(item => 
        item.locations.includes(selectedLocation)
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(filtered);
  }, [selectedLocation, searchQuery]);

  const addToCart = (item) => {
  setCartItems(prevItems => {
    const existingItem = prevItems.find(i => i.id === item.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = prevItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updatedCart = [...prevItems, { ...item, quantity: 1 }];
    }

    // ✅ Save to localStorage
    localStorage.setItem('grubzap-cart', JSON.stringify(updatedCart));
    return updatedCart;
  });
};

useEffect(() => {
  const storedCart = localStorage.getItem('grubzap-cart');
  if (storedCart) {
    setCartItems(JSON.parse(storedCart));
  }
}, []);



  const categorizedItems = categorizeMenuItems(filteredItems);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-grubzap-dark to-grubzap-dark/80 text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Menu</h1>
            <p className="text-lg max-w-2xl mx-auto text-center text-white/80 mb-6">
              Explore our wide selection of delicious dishes, prepared with fresh ingredients and delivered to your door.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    className="w-full pl-10 h-12 bg-white text-gray-800 rounded-l-md rounded-r-md md:rounded-r-none focus:outline-none"
                    value={selectedLocation || ""}
                    onChange={(e) => setSelectedLocation(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex-1 md:flex-[2]">
                <div className="relative">
                  <Input 
                    type="search"
                    placeholder="Search our menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 rounded-l-md rounded-r-md md:rounded-l-none pl-4 pr-4 text-gray-800"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-12">
          {Object.keys(categorizedItems).length > 0 ? (
            Object.entries(categorizedItems).map(([categoryName, items]) => (
              <div key={categoryName} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-gray-200">
                  {categoryName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <Card key={item.id} className="overflow-hidden card-hover border-gray-100">
                      <div className="relative h-48">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.tag && (
                          <Badge className="absolute top-3 left-3 bg-grubzap-orange border-none">
                            {item.tag}
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <span className="font-medium text-grubzap-orange">{item.price}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                        <div className="mt-4 flex">
                          <Button 
                            className="w-full bg-grubzap-orange hover:bg-grubzap-darkOrange"
                            onClick={() => addToCart(item)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-medium text-gray-500 mb-4">No menu items found</h3>
              <p className="text-gray-400">Try adjusting your location or search query</p>
              <Button 
                className="mt-6 bg-grubzap-orange hover:bg-grubzap-darkOrange"
                onClick={() => {
                  setSelectedLocation(null);
                  setSearchQuery("");
                }}
              >
                View All Items
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
