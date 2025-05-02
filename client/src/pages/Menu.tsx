
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const menuCategories = [
  {
    id: 1,
    name: "Popular Items",
    items: [
      { 
        id: 1, 
        name: "Spicy Chicken Burger", 
        price: "$10.99", 
        description: "Juicy chicken patty with spicy sauce and fresh vegetables", 
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        tag: "Bestseller" 
      },
      { 
        id: 2, 
        name: "Veggie Supreme Pizza", 
        price: "$14.99", 
        description: "Loaded with bell peppers, mushrooms, olives, and onions", 
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
        tag: "Vegetarian" 
      },
      { 
        id: 3, 
        name: "Classic Beef Burger", 
        price: "$11.99", 
        description: "Juicy beef patty with cheese, lettuce, and special sauce", 
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
        tag: "" 
      },
    ]
  },
  {
    id: 2,
    name: "Sides & Starters",
    items: [
      { 
        id: 4, 
        name: "Garlic Bread", 
        price: "$4.99", 
        description: "Crispy bread topped with garlic butter and herbs", 
        image: "https://images.unsplash.com/photo-1619535860434-da73a35c3763",
        tag: "" 
      },
      { 
        id: 5, 
        name: "Loaded Nachos", 
        price: "$7.99", 
        description: "Crispy tortilla chips with cheese, jalapeños, and salsa", 
        image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063",
        tag: "Shareable" 
      },
      { 
        id: 6, 
        name: "Onion Rings", 
        price: "$5.99", 
        description: "Crispy, golden-brown onion rings with dipping sauce", 
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d",
        tag: "" 
      },
    ]
  }
];

const Menu = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-grubzap-dark to-grubzap-dark/80 text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Menu</h1>
            <p className="text-lg max-w-2xl mx-auto text-center text-white/80">
              Explore our wide selection of delicious dishes, prepared with fresh ingredients and delivered to your door.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-12">
          {menuCategories.map((category) => (
            <div key={category.id} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-gray-200">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
