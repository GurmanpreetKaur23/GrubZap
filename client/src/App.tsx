import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Index from "./pages/Index"; // Home Page
import Menu from "./pages/Menu";
import Restaurants from "./pages/Restaurants";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import Payment from './pages/Payment';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://grubzap.onrender.com")  // your backend URL
      .then((res) => res.json())
      .then((data) => setMessage(data.message || "Welcome to GrubZap!"))
      // .catch(() => setMessage("Failed to fetch backend message."));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Optionally show Navbar on all pages */}
        {/* <Navbar /> */}

        {/* Show message somewhere, e.g., top of the app */}
        <div style={{ textAlign: "center", margin: "1rem", fontWeight: "bold" }}>
          {message}
        </div>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Index />} /> {/* Public Home page */}

          {/* Protected Routes (requires login) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch-All for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
