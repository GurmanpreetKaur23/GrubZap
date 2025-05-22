import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const DELIVERY_FEE = 40; // Flat delivery fee if cart not empty
const TAX_RATE = 0.05;   // 5% tax

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [promoCode, setPromoCode] = useState(""); // Promo code input
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null); // Applied promo code
  const [discount, setDiscount] = useState(0); // Discount value
  const navigate = useNavigate();
  const { toast } = useToast();

  // Retrieve token from storage for auth checks
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // Helper: check login, redirect and show toast if not logged in
  const requireLogin = (actionDesc: string) => {
    if (!token) {
      toast({
        title: "Login required",
        description: `Please login to ${actionDesc}.`,
      });
      navigate("/login");
      return false;
    }
    return true;
  };

  // Load cart from localStorage and normalize data on mount
  useEffect(() => {
    setIsMounted(true);
    const loadCartItems = () => {
      try {
        const storedCart = localStorage.getItem("grubzap-cart");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          const normalizedCart = parsedCart.map((item: any) => {
            // Clean and parse price, fallback to 0
            let priceStr = String(item.price).replace(/[^0-9.]/g, '');
            let priceNum = parseFloat(priceStr);
            if (isNaN(priceNum)) priceNum = 0;

            // Ensure quantity is at least 1
            let quantityNum = Number(item.quantity);
            if (isNaN(quantityNum) || quantityNum < 1) quantityNum = 1;

            return {
              ...item,
              price: priceNum,
              quantity: quantityNum,
            };
          });
          setCartItems(normalizedCart);
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  // Sync cart changes to localStorage
  useEffect(() => {
    localStorage.setItem("grubzap-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Promo code validation logic
  const validPromoCodes: { [code: string]: number } = {
    GGG10: 0.10, // 10% discount
    GRUB20:0.20, // 20% discount
    // Add more codes here
  };


  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (appliedPromo) {
      toast({
        title: "Promo code already applied",
        description: `You have already applied "${appliedPromo}".`,
      });
      return;
    }
    if (validPromoCodes[code]) {
      setAppliedPromo(code);
      setDiscount(validPromoCodes[code]);
      toast({
        title: "Promo code applied!",
        description: `You got ${(validPromoCodes[code] * 100).toFixed(0)}% off.`,
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code.",
      });
    }
  };

  // Update cart state helper
  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
  };

  // Increase item quantity
  const increaseQuantity = (itemId: number) => {
    if (!requireLogin("modify your cart")) return;

    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  // Decrease item quantity (minimum 1)
  const decreaseQuantity = (itemId: number) => {
    if (!requireLogin("modify your cart")) return;

    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
  };

  // Remove an item from cart
  const removeItem = (itemId: number) => {
    if (!requireLogin("remove items from your cart")) return;

    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    updateCart(updatedCart);
    toast({
      title: "Item removed from cart",
      description: "Your cart has been updated",
    });
  };

  // Clear entire cart
  const clearCart = () => {
    if (!requireLogin("clear your cart")) return;

    updateCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  // Calculate subtotal (sum of price * quantity)
  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate discount amount
  const calculateDiscount = (subtotal: number) =>
    appliedPromo && discount > 0 ? subtotal * discount : 0;

  // Calculate tax on subtotal after discount
  const calculateTax = (subtotal: number, discountAmt: number) =>
    (subtotal - discountAmt) * TAX_RATE;

  // Delivery fee applied only if cart has items
  const calculateDeliveryFee = () => (cartItems.length > 0 ? DELIVERY_FEE : 0);

  // Calculate total amount including subtotal, discount, tax, and delivery fee
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmt = calculateDiscount(subtotal);
    const tax = calculateTax(subtotal, discountAmt);
    const deliveryFee = calculateDeliveryFee();
    return subtotal - discountAmt + tax + deliveryFee;
  };

  // Proceed to checkout page
  const proceedToCheckout = () => {
    if (!requireLogin("checkout")) return;
    navigate("/payment");
  };

  // Navigate back to menu for shopping
  const continueShopping = () => navigate("/menu");

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
              <h2 className="text-2xl font-medium text-gray-600">
                Your cart is empty
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Browse
                our menu to find something delicious!
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
              {/* Cart Items List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <h2 className="text-xl font-semibold">
                      Items ({cartItems.length})
                    </h2>
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
                      <Card
                        key={item.id}
                        className={`overflow-hidden border-gray-100 transition-opacity duration-700 ${
                          isMounted ? "opacity-100" : "opacity-0"
                        }`}
                      >
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
                                <span className="font-semibold text-grubzap-orange">
                                  ₹{item.price.toFixed(2)}
                                </span>
                              </div>
                              <div className="mt-auto flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => decreaseQuantity(item.id)}
                                    disabled={item.quantity === 1}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center font-medium">
                                    {item.quantity}
                                  </span>
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

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  {/* Promo code input */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="promo">
                      Promo Code
                    </label>
                    <div className="flex space-x-2">
                      <input
                        id="promo"
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="border rounded px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-grubzap-orange"
                        placeholder="Enter promo code"
                        disabled={!!appliedPromo}
                      />
                      <Button
                        type="button"
                        onClick={handleApplyPromo}
                        disabled={!!appliedPromo || !promoCode.trim()}
                        className="bg-grubzap-orange hover:bg-grubzap-darkOrange"
                      >
                        {appliedPromo ? "Applied" : "Apply"}
                      </Button>
                    </div>
                    {appliedPromo && (
                      <div className="text-green-600 text-sm mt-1">
                        Promo "{appliedPromo}" applied!
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold mb-4">Complete Summary</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                        <span>-₹{calculateDiscount(calculateSubtotal()).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>
                        ₹
                        {calculateTax(
                          calculateSubtotal(),
                          calculateDiscount(calculateSubtotal())
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>₹{calculateDeliveryFee().toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{calculateTotal().toFixed(2)}</span>
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