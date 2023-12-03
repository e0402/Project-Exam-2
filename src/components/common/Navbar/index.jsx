import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginSuccess = () => {
      setIsLoggedIn(true);
    };

    window.addEventListener('login-success', handleLoginSuccess);

    return () => {
      window.removeEventListener('login-success', handleLoginSuccess);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isVenueManager');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="border border-gray-300 text-black sticky top-0 bg-off-white z-20">
      <div className="mx-2 md:mx-9 p-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center py-3 text-black hover:text-gray-800">
            <FaHome className="h-7 w-7 mr-2" />
            <span className="text-3xl font-bold">Holidaze</span>
          </NavLink>

          {/* Primary Nav */}
          <div className="hidden md:flex items-center text-sm">
            {isLoggedIn && (
            <NavLink to="/profile" className="py-3 px-4 text-base font-semibold hover:text-gray-200">Profile</NavLink>
            )}
              {!isLoggedIn && (
              <NavLink to="/register" className="bg-white hover:bg-gray-100 text-blue-700 border border-blue-700 font-semibold py-2 px-7 rounded-full mr-3">Sign Up</NavLink>
            )}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 font-semibold py-2 px-8 rounded-full">Log out</button>
            ) : (
              <NavLink to="/login" className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 font-semibold py-2 px-8 rounded-full">Login</NavLink>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "block py-2 px-3 text-sm font-semibold bg-gray-300" : "block py-2 px-3 text-sm font-semibold hover:text-gray-600"}>Home</NavLink>

          {isLoggedIn && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "block py-2 px-3 text-sm font-semibold bg-gray-300" : "block py-2 px-3 text-sm font-semibold hover:text-gray-600"
              }>Profile
            </NavLink>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} className="block w-full text-left py-2 px-3 text-sm font-semibold hover:text-gray-600">
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "block py-2 px-3 text-sm font-semibold bg-gray-300" : "block py-2 px-3 text-sm font-semibold hover:text-gray-600"
              }>Login
            </NavLink>
          )}

          {!isLoggedIn && (
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "block py-2 px-3 text-sm font-semibold bg-gray-300" : "block py-2 px-3 text-sm font-semibold hover:text-gray-600"
              }>Sign Up
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
