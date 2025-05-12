import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { MapPin } from "lucide-react";

// Locations
const locations = [
  { id: 1, name: "Ludhiana" },
  { id: 2, name: "Chandigarh" },
  { id: 3, name: "Patiala" },
  { id: 4, name: "Mohali" },
  { id: 5, name: "Rajpura" },
];

// Menu Items
// Menu Items
const menuItems = [
  {
    id: 1,
    name: "Spicy Chicken Burger",
    price: "₹120",
    description: "Juicy chicken patty with spicy sauce and fresh vegetables",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    tag: "Bestseller",
    locations: [1, 2, 3],
    type: "Non-Veg",
  },
  {
    id: 2,
    name: "Veggie Supreme Pizza",
    price: "₹350",
    description: "Loaded with bell peppers, mushrooms, olives, and onions",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    tag: "Vegetarian",
    locations: [1, 3, 4],
    type: "Veg",
  },
  {
    id: 3,
    name: "Mysore Masala Dosa",
    price: "₹200",
    description: "Crispy dosa with spicy mashed potatoes and chutney",
    image: "https://images.unsplash.com/photo-1743517894265-c86ab035adef",
    tag: "Bestseller",
    locations: [2, 3, 5],
    type: "Veg",
  },
  {
    id: 4,
    name: "Garlic Bread",
    price: "₹150",
    description: "Crispy bread topped with garlic butter and herbs",
    image:
      "https://www.simplyrecipes.com/thmb/5JwdiUjcSPTxyuhmdqv8pM8kWs0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Garlic-Bread-METHOD-2-3-1c5f5cfa8bf6408c84c0596eea83f8e8.jpg",
    tag: "",
    locations: [1, 2, 3, 4, 5],
    type: "Veg",
  },
  {
    id: 5,
    name: "Loaded Nachos",
    price: "₹400",
    description: "Crispy tortilla chips with cheese, jalapeños, and salsa",
    image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063",
    tag: "Shareable",
    locations: [1, 4, 5],
    type: "Veg",
  },
  {
    id: 6,
    name: "Onion Rings",
    price: "₹250",
    description: "Crispy, golden-brown onion rings with dipping sauce",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d",
    tag: "",
    locations: [2, 3, 5],
    type: "Veg",
  },
  {
    id: 7,
    name: "Margherita Pizza",
    price: "₹350",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    image: "https://www.stefanofaita.com/wp-content/uploads/2022/04/pizzamargherita1.jpg",
    tag: "Popular",
    locations: [1, 2, 3],
    type: "Veg",
  },
  {
    id: 8,
    name: "Caesar Salad",
    price: "₹250",
    description: "Fresh romaine lettuce with Caesar dressing and croutons",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
    tag: "Healthy",
    locations: [3, 4, 5],
    type: "Veg",
  },
  {
    id: 9,
    name: "Chocolate Sundae",
    price: "₹180",
    description: "Vanilla ice cream with hot fudge and whipped cream",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    tag: "Dessert",
    locations: [1, 2, 4],
    type: "Veg",
  },
  {
    id: 10,
    name: "Spicy Chicken Wings",
    price: "₹220",
    description: "Crunchy wings with a spicy kick and dipping sauce",
    image:
      "https://www.allrecipes.com/thmb/Wxed5-yelkf-JmTp0yqos6BzIq8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8768-ddmfs-sweet-spicy-wings-3X4-0076-b484a1db3199469385a540db0339f773.jpg",
    tag: "Bestseller",
    locations: [2, 3, 5],
    type: "Non-Veg",
  },
  {
    id: 11,
    name: "Paneer Tikka",
    price: "₹280",
    description: "Grilled paneer marinated with spices",
    image:
      "https://www.krumpli.co.uk/wp-content/uploads/2024/12/Paneer-Tikka-Kebabs-2-1200-735x735.jpg",
    tag: "Vegetarian",
    locations: [1, 3, 5],
    type: "Veg",
  },
  {
    id: 12,
    name: "BBQ Prawns",
    price: "₹450",
    description: "Grilled prawns with BBQ sauce and herbs",
    image:
      "https://www.maggi.co.uk/sites/default/files/styles/home_stage_944_531/public/srh_recipes/7eab2659d97cbb0ded1ade8bec46a284.jpg?h=53370bd2&itok=F13eA5fb",
    tag: "",
    locations: [1, 2, 3],
    type: "Non-Veg",
  },
  {
    id: 13,
    name: "Vegetable Biryani",
    price: "₹300",
    description: "Fragrant rice with mixed vegetables and spices",
    image: "https://i.ytimg.com/vi/Do7ZdUodDdw/maxresdefault.jpg",
    tag: "Vegetarian",
    locations: [1, 2, 5],
    type: "Veg",
  },
  {
    id: 14,
    name: "Aloo Paratha",
    price: "₹150",
    description: "Flatbread stuffed with spiced potatoes",
    image:
      "https://www.maggi.in/sites/default/files/srh_recipes/9cc96dc3b0168582c17fe2d98218026a.jpg",
    tag: "Vegetarian",
    locations: [2, 3, 5],
    type: "Veg",
  },
  {
    id: 15,
    name: "Falafel Wrap",
    price: "₹200",
    description: "Crispy falafel in a wrap with tahini sauce",
    image:
      "https://sixhungryfeet.com/wp-content/uploads/2022/08/Falafel-Pita-Sandwich-5.jpg",
    tag: "Vegetarian",
    locations: [1, 3, 4],
    type: "Veg",
  },
  {
    id: 16,
    name: "Fish Fry",
    price: "₹300",
    description: "Fried fish served with a tangy lemon sauce",
    image:
      "https://www.licious.in/blog/wp-content/uploads/2022/05/shutterstock_1116124928.jpg",
    tag: "Non-Veg",
    locations: [3, 4, 5],
    type: "Non-Veg",
  },
  {
    id: 17,
    name: "Pasta Alfredo",
    price: "₹400",
    description: "Creamy pasta with Alfredo sauce, mushrooms",
    image:
      "https://www.vanillabeancuisine.com/wp-content/uploads/2024/12/Spaghetti-Alfredo-FEAT-IMAGE.jpg",
    tag: "Popular",
    locations: [3, 4, 5],
    type: "Non-Veg",
  },
  {
    id: 18,
    name: "Mango Lassi",
    price: "₹180",
    description: "Refreshing mango yogurt drink",
    image: "https://dairyfarmersofcanada.ca/sites/default/files/styles/recipe_image/public/image_file_browser/conso_recipe/2024/Mango%20Lassi.jpg.jpeg?itok=4vyHrE8J",
    tag: "Vegetarian",
    locations: [1, 2, 3, 4],
    type: "Veg",
  },
  {
    id: 19,
    name: "Vegetable Spring Rolls",
    price: "₹200",
    description: "Crispy spring rolls filled with mixed vegetables",
    image: "https://www.kitchensanctuary.com/wp-content/uploads/2023/10/Vegetable-Spring-Rolls-square-FS.jpg",
    tag: "Vegetarian",
    locations: [1, 3, 5],
    type: "Veg",
  },
  {
    id: 20,
    name: "Masala Papad",
    price: "₹100",
    description: "Crispy papad with spicy toppings",
    image:
      "https://i0.wp.com/www.lovelaughmirch.com/wp-content/uploads/2016/03/MasalaPapad_8.jpg",
    tag: "Bestseller",
    locations: [2, 4, 5],
    type: "Veg",
  },
  {
    id: 21,
    name: "Chole Bhature",
    price: "₹250",
    description: "Chole served with fried bhature",
    image:
      "https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Chole-Bhature-1300x867.jpg?v=1620120118",
    tag: "Bestseller",
    locations: [1, 2, 3, 5],
    type: "Veg",
  },
  {
    id: 22,
    name: "Cheese Stuffed Garlic Bread",
    price: "₹180",
    description: "Garlic bread stuffed with melting cheese",
    image:
      "https://static.toiimg.com/photo/80287440.cms",
    tag: "Vegetarian",
    locations: [3, 4, 5],
    type: "Veg",
  },
  {
    id: 23,
    name: "Lemon Soda",
    price: "₹120",
    description: "Tangy and refreshing lemon soda",
    image:
      "https://sodasense.com/cdn/shop/articles/Lemon_Soda_-_Soda_Sense.jpg?v=1717186679",
    tag: "",
    locations: [1, 3, 4],
    type: "Veg",
  },
  {
    id: 24,
    name: "Crispy Tofu",
    price: "₹220",
    description: "Crispy fried tofu with dipping sauce",
    image: "https://frommybowl.com/wp-content/uploads/2019/01/How_To_Crispy_Tofu_Vegan_GlutenFree_OilFree_FromMyBowl-10.jpg",
    tag: "Vegetarian",
    locations: [2, 4, 5],
    type: "Veg",
  },
  {
    id: 25,
    name: "Vegetable Samosa",
    price: "₹100",
    description: "Crispy pastry filled with spiced potatoes and peas",
    image: "https://c.ndtvimg.com/2023-03/0m65kep_samosa_625x300_10_March_23.jpg",
    tag: "",
    locations: [1, 3, 5],
    type: "Veg",
  },
  {
    id: 26,
    name: "Choco Lava Cake",
    price: "₹250",
    description: "Molten chocolate cake with gooey center",
    image: "https://cdn.zeptonow.com/production/tr:w-640,ar-5198-5198,pr-true,f-auto,q-80/cms/product_variant/66c19f46-fdb7-47f4-a06c-eeaadd27805d.jpeg",
    tag: "Dessert",
    locations: [1, 2, 5],
    type: "Veg",
  },
  {
    id: 27,
    name: "Grilled Paneer Tikka",
    price: "₹300",
    description: "Grilled marinated paneer with spices",
    image: "https://www.littlesugarsnaps.com/wp-content/uploads/2021/06/Paneer-Tikka-Featured-Image.jpg",
    tag: "Vegetarian",
    locations: [2, 3, 4],
    type: "Veg",
  },
  {
    id: 28,
    name: "Strawberry Milkshake",
    price: "₹150",
    description: "Creamy strawberry milkshake topped with whipped cream",
    image: "https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2017/06/Strawberry-Coconut-Shake1-1.jpg-1.jpg",
    tag: "Popular",
    locations: [1, 4, 5],
    type: "Veg",
  },
  {
    id: 29,
    name: "Fish and Chips",
    price: "₹400",
    description: "Crispy fried fish served with golden fries",
    image: "https://recipes.timesofindia.com/thumb/59736398.cms?width=1200&height=900",
    tag: "Non-Veg",
    locations: [3, 5],
    type: "Non-Veg",
  },
  {
    id: 30,
    name: "Chocolate Mousse",
    price: "₹180",
    description: "Rich chocolate mousse with whipped cream",
    image: "https://bakerbynature.com/wp-content/uploads/2023/08/Easy-Chocolate-Mousse-Baker-by-Nature-12617-1.jpg",
    tag: "Dessert",
    locations: [1, 2, 4],
    type: "Veg",
  },
];

const categorizeMenuItems = (items) => {
  const categories = {
    "Popular Items": items.filter(
      (item) => item.tag === "Bestseller" || item.tag === "Popular"
    ),
    "Main Dishes": items.filter(
      (item) =>
        item.name.includes("Burger") ||
        item.name.includes("Pizza") ||
        (!item.tag.includes("Dessert") &&
          !item.name.includes("Bread") &&
          !item.name.includes("Rings") &&
          !item.name.includes("Nachos") &&
          !item.name.includes("Salad"))
    ),
    "Sides & Starters": items.filter(
      (item) =>
        item.name.includes("Bread") ||
        item.name.includes("Rings") ||
        item.name.includes("Nachos") ||
        item.name.includes("Salad")
    ),
    Desserts: items.filter((item) => item.tag === "Dessert"),
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
      filtered = filtered.filter((item) =>
        item.locations.includes(selectedLocation)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
  }, [selectedLocation, searchQuery]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedCart = [...prevItems, { ...item, quantity: 1 }];
      }

      // ✅ Save to localStorage
      localStorage.setItem("grubzap-cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("grubzap-cart");
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Our Menu
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-center text-white/80 mb-6">
              Explore our wide selection of delicious dishes, prepared with
              fresh ingredients and delivered to your door.
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    className="w-full pl-10 h-12 bg-white text-gray-800 rounded-l-md rounded-r-md md:rounded-r-none focus:outline-none"
                    value={selectedLocation || ""}
                    onChange={(e) =>
                      setSelectedLocation(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
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
                    <Card
                      key={item.id}
                      className="overflow-hidden card-hover border-gray-100"
                    >
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
                          <span className="font-medium text-grubzap-orange">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
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
              <h3 className="text-2xl font-medium text-gray-500 mb-4">
                No menu items found
              </h3>
              <p className="text-gray-400">
                Try adjusting your location or search query
              </p>
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
