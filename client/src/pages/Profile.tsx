import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Clock, CreditCard, Home, Package, Settings, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// User profile type
type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joined: string;
  addresses: {
    id: number;
    type: string;
    address: string;
    isDefault: boolean;
  }[];
  paymentMethods: {
    id: number;
    type: string;
    last4: string;
    expiry: string;
    isDefault: boolean;
  }[];
};

// Order type
type Order = {
  id: string;
  date: string;
  restaurant: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'delivered' | 'processing' | 'cancelled';
};

// Mock fetch user profile
const fetchUserProfile = async (): Promise<UserProfile> => {
  // In a real app, this would be an API call
  return {
    id: "user123",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    joined: "January 2023",
    addresses: [
      {
        id: 1,
        type: "Home",
        address: "123 Main Street, Apt 4B, New York, NY 10001",
        isDefault: true
      },
      {
        id: 2,
        type: "Work",
        address: "456 Business Avenue, Suite 200, New York, NY 10002",
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: 1,
        type: "Visa",
        last4: "4242",
        expiry: "05/2026",
        isDefault: true
      },
      {
        id: 2,
        type: "Mastercard",
        last4: "8888",
        expiry: "09/2025",
        isDefault: false
      }
    ]
  };
};

// Mock fetch orders
const fetchOrders = async (): Promise<Order[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: "ORD-9876",
      date: "May 12, 2025",
      restaurant: "Pizza Paradise",
      items: [
        { name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
        { name: "Garlic Bread", quantity: 1, price: 4.99 },
        { name: "Soda", quantity: 2, price: 1.99 }
      ],
      total: 23.96,
      status: "delivered"
    },
    {
      id: "ORD-9875",
      date: "May 8, 2025",
      restaurant: "Burger Bliss",
      items: [
        { name: "Cheeseburger", quantity: 2, price: 8.99 },
        { name: "French Fries", quantity: 1, price: 3.99 },
        { name: "Chocolate Shake", quantity: 1, price: 4.99 }
      ],
      total: 26.96,
      status: "processing"
    },
    {
      id: "ORD-9874",
      date: "May 2, 2025",
      restaurant: "Sushi Supreme",
      items: [
        { name: "California Roll", quantity: 1, price: 7.99 },
        { name: "Rainbow Roll", quantity: 1, price: 12.99 },
        { name: "Miso Soup", quantity: 2, price: 2.99 }
      ],
      total: 26.96,
      status: "delivered"
    },
    {
      id: "ORD-9873",
      date: "April 25, 2025",
      restaurant: "Taco Town",
      items: [
        { name: "Beef Tacos", quantity: 3, price: 3.99 },
        { name: "Guacamole", quantity: 1, price: 2.99 },
        { name: "Horchata", quantity: 1, price: 2.99 }
      ],
      total: 17.95,
      status: "cancelled"
    }
  ];
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      toast({
        title: "Not logged in",
        description: "Please log in to view your profile",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // In a real app, these would be authenticated API calls
        const userData = await fetchUserProfile();
        const ordersData = await fetchOrders();
        
        setProfile(userData);
        setOrders(ordersData);
        setFormData({
          name: userData.name,
          email: userData.email,
          phone: userData.phone
        });
      } catch (error) {
        console.error('Error loading user data:', error);
        toast({
          title: "Failed to load profile",
          description: "There was an error loading your profile information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to update the user profile
    if (profile) {
      setProfile({
        ...profile,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully",
      });
      
      setIsEditing(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Profile Sidebar */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="pt-6">
                  {isLoading ? (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ) : profile && (
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                      </Avatar>
                      <h2 className="mt-4 text-xl font-bold">{profile.name}</h2>
                      <p className="text-gray-500">{profile.email}</p>
                      <p className="text-sm text-gray-400 mt-1">Member since {profile.joined}</p>
                      
                      <Separator className="my-6" />
                      
                      <nav className="w-full space-y-1">
                        <Button variant="ghost" className="w-full justify-start" size="lg">
                          <User className="mr-2 h-4 w-4" />
                          Personal Info
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" size="lg">
                          <Package className="mr-2 h-4 w-4" />
                          Order History
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" size="lg">
                          <Home className="mr-2 h-4 w-4" />
                          Addresses
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" size="lg">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Payment Methods
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" size="lg">
                          <Settings className="mr-2 h-4 w-4" />
                          Account Settings
                        </Button>
                      </nav>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9">
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Personal Information</CardTitle>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(!isEditing)}
                          disabled={isLoading}
                        >
                          {isEditing ? "Cancel" : "Edit Profile"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      ) : isEditing ? (
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name">Full Name</Label>
                              <Input 
                                id="name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email Address</Label>
                              <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                value={formData.email} 
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input 
                                id="phone" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-grubzap-orange hover:bg-grubzap-darkOrange"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </form>
                      ) : profile && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                              <p className="mt-1">{profile.name}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                              <p className="mt-1">{profile.email}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                              <p className="mt-1">{profile.phone}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                              <p className="mt-1">{profile.joined}</p>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Saved Addresses</h3>
                            <div className="space-y-3">
                              {profile.addresses.map(address => (
                                <div key={address.id} className="flex items-start p-3 border rounded-lg">
                                  <div className="mr-3">
                                    <Home className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium">{address.type}</p>
                                        <p className="text-gray-600 text-sm">{address.address}</p>
                                      </div>
                                      {address.isDefault && (
                                        <Badge variant="outline" className="ml-2">Default</Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <Button variant="outline" className="w-full">
                                Add New Address
                              </Button>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                            <div className="space-y-3">
                              {profile.paymentMethods.map(method => (
                                <div key={method.id} className="flex items-start p-3 border rounded-lg">
                                  <div className="mr-3">
                                    <CreditCard className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium">{method.type} ending in {method.last4}</p>
                                        <p className="text-gray-600 text-sm">Expires {method.expiry}</p>
                                      </div>
                                      {method.isDefault && (
                                        <Badge variant="outline" className="ml-2">Default</Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <Button variant="outline" className="w-full">
                                Add New Payment Method
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Orders Tab */}
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="h-24 w-full bg-gray-200 rounded animate-pulse"></div>
                          ))}
                        </div>
                      ) : orders.length === 0 ? (
                        <div className="text-center py-8">
                          <Package className="h-12 w-12 mx-auto text-gray-400" />
                          <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                          <p className="text-gray-500 mt-1">When you place orders, they'll appear here</p>
                          <Button 
                            className="mt-4 bg-grubzap-orange hover:bg-grubzap-darkOrange"
                            onClick={() => navigate('/menu')}
                          >
                            Browse Menu
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {orders.map(order => (
                            <div key={order.id} className="border rounded-lg overflow-hidden">
                              <div className="bg-gray-50 p-4 flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <p className="font-medium">{order.restaurant}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-gray-500">Order #{order.id}</span>
                                    <span className="text-sm text-gray-500 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {order.date}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </span>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="space-y-2">
                                  {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                      <span>{item.quantity}x {item.name}</span>
                                      <span>${item.price.toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                                <Separator className="my-3" />
                                <div className="flex justify-between font-medium">
                                  <span>Total</span>
                                  <span>${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label htmlFor="order-updates" className="text-sm font-medium">
                                Order updates
                              </label>
                              <input 
                                type="checkbox" 
                                id="order-updates"
                                defaultChecked
                                className="h-4 w-4 text-grubzap-orange focus:ring-grubzap-orange border-gray-300 rounded"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <label htmlFor="promotions" className="text-sm font-medium">
                                Promotions and deals
                              </label>
                              <input 
                                type="checkbox" 
                                id="promotions"
                                defaultChecked
                                className="h-4 w-4 text-grubzap-orange focus:ring-grubzap-orange border-gray-300 rounded"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <label htmlFor="newsletter" className="text-sm font-medium">
                                Newsletter
                              </label>
                              <input 
                                type="checkbox" 
                                id="newsletter"
                                className="h-4 w-4 text-grubzap-orange focus:ring-grubzap-orange border-gray-300 rounded"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Password</h3>
                          <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange">
                            Change Password
                          </Button>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start text-gray-700">
                              Export Your Data
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:border-red-600">
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;