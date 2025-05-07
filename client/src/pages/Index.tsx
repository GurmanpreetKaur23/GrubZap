
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedRestaurants from '@/components/FeaturedRestaurants';
import HowItWorks from '@/components/HowItWorks';
import AppPromotion from '@/components/AppPromotion';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedRestaurants />
        <HowItWorks />
        <AppPromotion />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
