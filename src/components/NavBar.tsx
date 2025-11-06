import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-primary-dark via-orange to-orange-light shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-bold text-black drop-shadow-md">
            🍔 OrderFood
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white-300 font-medium hover:text-gray-900 transition-colors">
              Home
            </Link>
            
            {user ? (
              <>
                <Link to="/cart" className="text-white-300 font-medium hover:text-gray-900 transition-colors">
                  🛒 Cart
                </Link>
                <Link to="/orders" className="text-white-300 font-medium hover:text-gray-900 transition-colors">
                  📦 My Orders
                </Link>
                <span className="text-white-300 font-medium hidden lg:inline">Welcome, {user.email}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-primary-dark px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all font-semibold shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white font-medium hover:text-gray-900 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary-dark px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all font-semibold shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link 
              to="/" 
              onClick={closeMobileMenu}
              className="block text-white font-medium hover:text-gray-900 transition-colors py-2"
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/cart" 
                  onClick={closeMobileMenu}
                  className="block text-white font-medium hover:text-gray-900 transition-colors py-2"
                >
                  🛒 Cart
                </Link>
                <Link 
                  to="/orders" 
                  onClick={closeMobileMenu}
                  className="block text-white font-medium hover:text-gray-900 transition-colors py-2"
                >
                  📦 My Orders
                </Link>
                <div className="text-white font-medium py-2 text-sm">
                  Welcome, {user.email}!
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-white text-primary-dark px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all font-semibold shadow-md text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={closeMobileMenu}
                  className="block text-white font-medium hover:text-gray-900 transition-colors py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="block bg-white text-primary-dark px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all font-semibold shadow-md text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
