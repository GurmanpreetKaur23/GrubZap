import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, MapPin, ShoppingBag, Calendar, CreditCardIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// This would normally come from a global cart context or state management
interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

const Payment = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const storedCart = localStorage.getItem('grubzap-cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCartItems();
  }, []);
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };
  
  const calculateTax = (subtotal: number) => {
    return subtotal * 0.08; // 8% tax rate example
  };
  
  const calculateDeliveryFee = () => {
    return cartItems.length > 0 ? 3.99 : 0;
  };
  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const deliveryFee = calculateDeliveryFee();
    return subtotal + tax + deliveryFee;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order successfully placed!",
        description: "Your food is on the way.",
      });
      
      // Clear cart after successful order
      localStorage.removeItem('grubzap-cart');
      
      // Redirect to home page
      navigate('/');
    }, 2000);
  };
  
  const goBack = () => {
    navigate('/cart');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading payment information...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-6">
              <div className="flex justify-center">
                <ShoppingBag className="h-24 w-24 text-gray-300" />
              </div>
              <h2 className="text-2xl font-medium text-gray-600">Your cart is empty</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                You can't proceed to checkout without any items in your cart.
              </p>
              <div className="pt-4">
                <Button 
                  onClick={() => navigate('/menu')}
                  className="bg-grubzap-orange hover:bg-grubzap-darkOrange"
                >
                  Browse Menu
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Delivery Information */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="text-grubzap-orange" />
                        <h2 className="text-xl font-semibold">Delivery Information</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="(123) 456-7890" required />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="123 Main St" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input id="zipCode" placeholder="10001" required />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="deliveryNotes">Delivery Instructions (Optional)</Label>
                          <Input id="deliveryNotes" placeholder="E.g., Leave at the door, call upon arrival, etc." />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Payment Method */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <CreditCard className="text-grubzap-orange" />
                        <h2 className="text-xl font-semibold">Payment Method</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="paymentCard" 
                            name="paymentMethod" 
                            checked={paymentMethod === 'card'} 
                            onChange={() => setPaymentMethod('card')}
                            className="h-4 w-4 text-grubzap-orange"
                          />
                          <Label htmlFor="paymentCard" className="flex items-center">
                            <CreditCardIcon className="mr-2 h-5 w-5" />
                            Credit / Debit Card
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="paymentCash" 
                            name="paymentMethod" 
                            checked={paymentMethod === 'cash'} 
                            onChange={() => setPaymentMethod('cash')}
                            className="h-4 w-4 text-grubzap-orange"
                          />
                          <Label htmlFor="paymentCash">Cash on Delivery</Label>
                        </div>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="mt-4 space-y-4 border-t pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input id="cardName" placeholder="John Doe" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiration Date</Label>
                              <Input id="expiryDate" placeholder="MM/YY" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" required />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 pt-2">
                            <Checkbox id="saveCard" />
                            <Label htmlFor="saveCard">Save card for future orders</Label>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={goBack}
                    >
                      Back to Cart
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-grubzap-orange hover:bg-grubzap-darkOrange"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : Pay $${calculateTotal().toFixed(2)}}
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-3 flex justify-between">
                        <div>
                          <span className="font-medium">{item.quantity} x </span>
                          {item.name}
                        </div>
                        <span className="font-medium">
                          ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t mt-4 pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>${calculateDeliveryFee().toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-500">
                    <p>Estimated delivery time: 30-45 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;