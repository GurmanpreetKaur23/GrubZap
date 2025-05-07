
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    id: 1,
    icon: "📱",
    title: "Order with ease",
    description: "Browse restaurants and dishes, add to cart, and checkout with a few taps."
  },
  {
    id: 2,
    icon: "👨‍🍳",
    title: "Food prepared",
    description: "Restaurants receive your order and begin preparing your delicious meal."
  },
  {
    id: 3,
    icon: "🚚",
    title: "Fast delivery",
    description: "Our delivery partners bring your food right to your doorstep."
  },
  {
    id: 4,
    icon: "😋",
    title: "Enjoy your food",
    description: "Receive your food hot and fresh, ready to enjoy immediately."
  }
];

const HowItWorks = () => {
  return (
    <section className="section-container">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-grubzap-dark mb-3">
          How <span className="text-grubzap-orange">GrubZap</span> Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Getting your favorite food delivered to your doorstep is easier than ever with our simple 4-step process.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <Card key={step.id} className="border-none shadow-md card-hover relative">
            <span className="absolute top-0 left-0 w-8 h-8 bg-grubzap-orange text-white flex items-center justify-center rounded-tl-md rounded-br-md font-bold">
              {step.id}
            </span>
            <CardContent className="pt-10 pb-6 text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-grubzap-dark">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
