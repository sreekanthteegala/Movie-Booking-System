import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  const openRegisterModal = () => {
    setAuthMode('register');
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const navigateToProfile = () => {
    navigate('/profile');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-dark-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center" 
              aria-label="Home"
            >
              <span className="text-primary-500 font-heading font-bold text-2xl">Cinema</span>
              <span className="text-white font-heading font-bold text-2xl">Select</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-dark-700 text-white px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 w-56"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>

            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-white hover:text-primary-400 transition py-2">
                  <span>{user?.name}</span>
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <button 
                      onClick={navigateToProfile}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-dark-700"
                    >
                      Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-dark-700 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={openLoginModal}
                  className="px-4 py-2 rounded-md text-white hover:text-primary-400 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={openRegisterModal}
                  className="px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-800">
          <div className="px-3 py-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-dark-700 text-white px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 w-full"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {isLoggedIn ? (
            <>
              <div className="px-3 py-2 text-gray-300">
                Signed in as <span className="font-semibold">{user?.name}</span>
              </div>
              <button
                onClick={navigateToProfile}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-dark-700 hover:text-white"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-dark-700 hover:text-white"
              >
                <LogOut size={16} className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={openLoginModal}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-dark-700 hover:text-white"
              >
                Sign In
              </button>
              <button
                onClick={openRegisterModal}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuthModal(false)}
          onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        />
      )}
    </nav>
  );
};

export default Navbar;