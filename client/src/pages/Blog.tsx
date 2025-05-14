import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MessageCircle, Search, Tag, User } from "lucide-react";

// Blog post type definition
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  commentCount: number;
  featured: boolean;
};

// Mock blog posts data
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Best Food Delivery Services in 2025",
    excerpt: "Discover the top food delivery services that are revolutionizing the way we order food.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    author: {
      name: "Michael Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    date: "May 14, 2025",
    readTime: "5 min read",
    category: "Food Delivery",
    tags: ["food delivery", "restaurants", "takeout"],
    commentCount: 18,
    featured: true
  },
  {
    id: 2,
    title: "How to Save Money on Food Delivery",
    excerpt: "Learn the best tips and tricks to save money while still enjoying the convenience of food delivery.",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://images.unsplash.com/photo-1532634993-15f421e42ec0",
    author: {
      name: "Sarah Wilson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    date: "May 10, 2025",
    readTime: "7 min read",
    category: "Tips & Tricks",
    tags: ["saving money", "food delivery", "tips"],
    commentCount: 24,
    featured: false
  },
  {
    id: 3,
    title: "The Rise of Ghost Kitchens in 2025",
    excerpt: "Exploring how ghost kitchens are transforming the restaurant industry landscape.",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389",
    author: {
      name: "Alex Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    date: "May 5, 2025",
    readTime: "8 min read",
    category: "Industry Trends",
    tags: ["ghost kitchens", "restaurants", "food industry"],
    commentCount: 32,
    featured: true
  },
  {
    id: 4,
    title: "Healthy Meal Delivery Services Review",
    excerpt: "Comprehensive review of the top healthy meal delivery services for health-conscious consumers.",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    author: {
      name: "Emma Roberts",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    date: "April 28, 2025",
    readTime: "10 min read",
    category: "Health & Wellness",
    tags: ["healthy eating", "meal delivery", "nutrition"],
    commentCount: 29,
    featured: false
  },
  {
    id: 5,
    title: "The Future of Food Tech in Delivery",
    excerpt: "Exploring emerging technologies reshaping the food delivery ecosystem.",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    image: "https://images.unsplash.com/photo-1593642633279-1796119d5482",
    author: {
      name: "David Park",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    date: "April 22, 2025",
    readTime: "6 min read",
    category: "Technology",
    tags: ["foodtech", "innovation", "delivery"],
    commentCount: 15,
    featured: false
  },
  {
    id: 6,
    title: "Best Practices for Restaurant Owners Using Delivery Apps",
    excerpt: "Essential strategies for restaurant owners to maximize their success with food delivery platforms.",
    content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
    author: {
      name: "Lisa Thompson",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    date: "April 15, 2025",
    readTime: "9 min read",
    category: "Business",
    tags: ["restaurant business", "delivery apps", "strategy"],
    commentCount: 21,
    featured: false
  }
];

// Fetch blog posts from API
const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  // For demo purposes, we'll always return mock data
  console.log('Using mock blog data');
  return mockBlogPosts;
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { toast } = useToast();
  
  // Fetch blog posts using React Query or simple state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogPosts();
        setPosts(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(post => post.category)));
        setCategories(['All', ...uniqueCategories]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter posts when search query or category changes
  useEffect(() => {
    if (posts.length > 0) {
      let filtered = [...posts];
      
      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(post => post.category === selectedCategory);
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      setFilteredPosts(filtered);
    }
  }, [posts, searchQuery, selectedCategory]);
  
  const handleReadPost = (postId: number) => {
    toast({
      title: "Blog Post Selected",
      description: "This would navigate to the full blog post in a real application.",
    });
    console.log(`Reading post with ID: ${postId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Blog Header */}
        <section className="bg-gradient-to-r from-grubzap-dark to-grubzap-dark/80 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Food Delivery 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-grubzap-orange to-grubzap-yellow block mt-2">
                  Insights & Tips
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Discover the latest trends, tips, and insights about food delivery and the restaurant industry.
              </p>
              <div className="relative max-w-lg mx-auto">
                <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">
                  <Search className="h-5 w-5 text-gray-400 ml-4" />
                  <Input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="py-4 px-3 w-full text-gray-800 focus:outline-none border-none rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Category Filter */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  className={category === selectedCategory ? "bg-grubzap-orange hover:bg-grubzap-darkOrange" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Posts */}
        {isLoading ? (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <Skeleton className="h-10 w-64 mb-8" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Skeleton className="h-80 rounded-xl" />
                <Skeleton className="h-80 rounded-xl" />
              </div>
            </div>
          </section>
        ) : isError ? (
          <div className="text-center py-16">
            <div className="text-red-500 mb-4 text-xl">Unable to load blog posts</div>
            <Button 
              className="bg-grubzap-orange hover:bg-grubzap-darkOrange"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          filteredPosts.some(post => post.featured) && (
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-grubzap-dark mb-8">
                  Featured <span className="text-grubzap-orange">Articles</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredPosts
                    .filter(post => post.featured)
                    .slice(0, 2)
                    .map((post) => (
                      <Card 
                        key={post.id} 
                        className="overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow duration-300"
                        onClick={() => handleReadPost(post.id)}
                      >
                        <div className="relative h-64">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Badge className="absolute top-4 left-4 bg-grubzap-orange border-none">
                            Featured
                          </Badge>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="bg-gray-100">
                              {post.category}
                            </Badge>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="font-bold text-xl md:text-2xl mb-2 group-hover:text-grubzap-orange transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{post.author.name}</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {post.commentCount} comments
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </section>
          )
        )}
        
        {/* All Blog Posts */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-grubzap-dark mb-8">
              Latest <span className="text-grubzap-orange">Articles</span>
            </h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-20 w-full mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4 text-xl">Unable to load blog posts</div>
                <Button 
                  className="bg-grubzap-orange hover:bg-grubzap-darkOrange"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">No articles found matching your search</div>
                <Button 
                  className="bg-grubzap-orange hover:bg-grubzap-darkOrange"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <Card 
                      key={post.id} 
                      className="overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow duration-300"
                      onClick={() => handleReadPost(post.id)}
                    >
                      <div className="relative h-48">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-gray-100">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{post.date}</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-grubzap-orange transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>
                                <User className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">{post.author.name}</span>
                          </div>
                          <span className="text-xs flex items-center text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              
                {/* Load more button */}
                <div className="text-center mt-12">
                  <Button 
                    variant="outline" 
                    className="border-grubzap-orange text-grubzap-orange hover:bg-grubzap-orange/10"
                  >
                    Load More Articles
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-grubzap-dark mb-4">
                Subscribe to Our <span className="text-grubzap-orange">Newsletter</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Get the latest food delivery trends and tips delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow"
                />
                <Button className="bg-grubzap-orange hover:bg-grubzap-darkOrange">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;