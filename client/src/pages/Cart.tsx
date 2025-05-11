import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

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

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('grubzap-cart', JSON.stringify(newCart));
  };

  const increaseQuantity = (itemId: number) => {
    if (!token) {
      toast({ title: 'Login required', description: 'Please login to modify your cart.' });
      navigate('/login');
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (itemId: number) => {
    if (!token) {
      toast({ title: 'Login required', description: 'Please login to modify your cart.' });
      navigate('/login');
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (itemId: number) => {
    if (!token) {
      toast({ title: 'Login required', description: 'Please login to remove items from your cart.' });
      navigate('/login');
      return;
    }

    const updatedCart = cartItems.filter(item => item.id !== itemId);
    updateCart(updatedCart);
    toast({
      title: 'Item removed from cart',
      description: 'Your cart has been updated',
    });
  };

  const clearCart = () => {
    if (!token) {
      toast({ title: 'Login required', description: 'Please login to clear your cart.' });
      navigate('/login');
      return;
    }

    updateCart([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart',
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price * item.quantity;
    }, 0);
  };

  const calculateTax = (subtotal: number) => subtotal * 0.08;
  const calculateDeliveryFee = () => (cartItems.length > 0 ? 3.99 : 0);
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const deliveryFee = calculateDeliveryFee();
    return subtotal + tax + deliveryFee;
  };

  const proceedToCheckout = () => {
    if (!token) {
      toast({ title: 'Login required', description: 'Please login to checkout.' });
      navigate('/login');
      return;
    }
    navigate('/payment');
  };

  const continueShopping = () => navigate('/menu');

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading your cart...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-6">
              <div className="flex justify-center">
                <ShoppingBag className="h-24 w-24 text-gray-300" />
              </div>
              <h2 className="text-2xl font-medium text-gray-600">Your cart is empty</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. 
                Browse our menu to find something delicious!
              </p>
              <div className="pt-4">
                <Button 
                  onClick={continueShopping}
                  className="bg-grubzap-orange hover:bg-grubzap-darkOrange"
                >
                  Browse Menu
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <h2 className="text-xl font-semibold">Items ({cartItems.length})</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden border-gray-100">
                        <CardContent className="p-0">
                          <div className="flex">
                            <div className="h-24 w-24 flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-grow p-4 flex flex-col">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium">{item.name}</h3>
                                <span className="font-semibold text-grubzap-orange">{item.price}</span>
                              </div>
                              <div className="mt-auto flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => decreaseQuantity(item.id)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => increaseQuantity(item.id)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
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
                  <div className="mt-6 space-y-3">
                    <Button 
                      className="w-full bg-grubzap-orange hover:bg-grubzap-darkOrange"
                      onClick={proceedToCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline" 
                      className="w-full"
                      onClick={continueShopping}
                    >
                      Continue Shopping
                    </Button>
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

export default Cart;
