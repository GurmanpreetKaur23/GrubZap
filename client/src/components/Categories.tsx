
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Pizza",
    image: "🍕",
    color: "bg-red-100"
  },
  {
    id: 2,
    name: "Burgers",
    image: "🍔",
    color: "bg-amber-100"
  },
  {
    id: 3,
    name: "Sushi",
    image: "🍣",
    color: "bg-green-100"
  },
  {
    id: 4,
    name: "Tacos",
    image: "🌮",
    color: "bg-yellow-100"
  },
  {
    id: 5,
    name: "Pasta",
    image: "🍝",
    color: "bg-orange-100"
  },
  {
    id: 6,
    name: "Salad",
    image: "🥗",
    color: "bg-emerald-100"
  },
  {
    id: 7,
    name: "Dessert",
    image: "🧁",
    color: "bg-pink-100"
  },
  {
    id: 8,
    name: "Drinks",
    image: "🥤",
    color: "bg-blue-100"
  }
];

const Categories = () => {
  return (
    <section className="section-container">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-grubzap-dark">
          Explore <span className="text-grubzap-orange">Categories</span>
        </h2>
        <a href="#" className="text-grubzap-orange font-medium hover:underline">
          View All
        </a>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className={`border-none shadow-md ${category.color} card-hover overflow-hidden`}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-2">{category.image}</div>
              <h3 className="font-medium text-gray-800">{category.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Categories;
