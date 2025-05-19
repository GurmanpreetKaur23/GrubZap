import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Add from './pages/Add/Add' 
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url="http://localhost:4000"
  const location = useLocation();
  const noNavPaths = ['/login', '/signup'];

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const showNav = !noNavPaths.includes(location.pathname);

  // Handlers to update authentication state, to be passed to Login and Signup
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated && !noNavPaths.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <ToastContainer />
      {showNav && <Navbar onLogout={handleLogout} />}
      {showNav && <hr />}
      <div className="app-content">
        {showNav && <Sidebar />}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
