import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Clock, Ticket, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings'>('bookings');
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  
  if (!isLoggedIn || !user) {
    return null;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Mock booking history (in a real app, this would come from the user object)
  const bookingHistory = [
    {
      id: 'BK78956123',
      movieTitle: 'Interstellar: Beyond Time',
      theaterName: 'Cineplex Royal',
      date: '2023-04-15',
      time: '19:30',
      seats: ['F7', 'F8'],
      amount: 350,
      status: 'confirmed',
    },
    {
      id: 'BK45632178',
      movieTitle: 'The Quantum Paradox',
      theaterName: 'IMAX Experience',
      date: '2023-03-22',
      time: '20:00',
      seats: ['C12', 'C13', 'C14'],
      amount: 600,
      status: 'confirmed',
    },
    {
      id: 'BK32145698',
      movieTitle: 'Lost in Tokyo',
      theaterName: 'Starlight Cinema',
      date: '2023-02-10',
      time: '15:45',
      seats: ['H4', 'H5'],
      amount: 280,
      status: 'confirmed',
    },
  ];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-dark-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-gray-400 mt-2">Manage your account and bookings</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-dark-800 rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-6 border-b border-dark-700">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center">
                    <User size={30} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'bookings'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-dark-700'
                    }`}
                  >
                    <Ticket size={18} className="mr-3" />
                    <span>Booking History</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                      activeTab === 'settings'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-dark-700'
                    }`}
                  >
                    <Settings size={18} className="mr-3" />
                    <span>Account Settings</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 rounded-md text-gray-300 hover:bg-dark-700 transition-colors"
                  >
                    <LogOut size={18} className="mr-3" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </motion.div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-dark-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Booking History</h2>
                  
                  {bookingHistory.length === 0 ? (
                    <div className="text-center py-12">
                      <Ticket size={48} className="mx-auto text-gray-600 mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">No bookings yet</h3>
                      <p className="text-gray-400 mb-6">You haven't made any bookings yet.</p>
                      <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                      >
                        Browse Movies
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {bookingHistory.map((booking, index) => (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="bg-dark-700 rounded-lg overflow-hidden shadow-md"
                        >
                          <div className="p-5 border-b border-dark-600">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-semibold text-white">{booking.movieTitle}</h3>
                              <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">
                                {booking.status}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-400 mt-2 text-sm">
                              <Clock size={14} className="mr-1" />
                              <span>{formatDate(booking.date)} • {booking.time}</span>
                            </div>
                          </div>
                          
                          <div className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <div className="text-sm text-gray-500">Theater</div>
                                <div className="text-white">{booking.theaterName}</div>
                              </div>
                              
                              <div>
                                <div className="text-sm text-gray-500">Seats</div>
                                <div className="text-white">{booking.seats.join(', ')}</div>
                              </div>
                              
                              <div>
                                <div className="text-sm text-gray-500">Amount</div>
                                <div className="text-white">₹{booking.amount.toFixed(2)}</div>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center">
                              <div className="text-xs text-gray-500">
                                Booking ID: {booking.id}
                              </div>
                              
                              <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
                                View Details
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-dark-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-dark-700 rounded-lg p-5">
                      <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                            Full Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            defaultValue={user.name}
                            className="w-full px-4 py-2 bg-dark-600 border border-dark-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            defaultValue={user.email}
                            className="w-full px-4 py-2 bg-dark-600 border border-dark-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            defaultValue="+1 (555) 123-4567"
                            className="w-full px-4 py-2 bg-dark-600 border border-dark-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-dark-700 rounded-lg p-5">
                      <h3 className="text-lg font-semibold text-white mb-4">Password</h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400 mb-1">
                            Current Password
                          </label>
                          <input
                            id="currentPassword"
                            type="password"
                            className="w-full px-4 py-2 bg-dark-600 border border-dark-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400 mb-1">
                            New Password
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            className="w-full px-4 py-2 bg-dark-600 border border-dark-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            className="w-full px-4 py-2 bg-dark-600 border border-dark-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-dark-700 rounded-lg p-5">
                      <h3 className="text-lg font-semibold text-white mb-4">Payment Methods</h3>
                      
                      <div className="flex items-center justify-between p-4 border border-dark-600 rounded-md mb-4">
                        <div className="flex items-center">
                          <CreditCard size={24} className="text-gray-400 mr-3" />
                          <div>
                            <div className="text-white">•••• •••• •••• 4242</div>
                            <div className="text-sm text-gray-500">Expires 12/25</div>
                          </div>
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-dark-600 text-gray-300 rounded-full text-xs">Default</span>
                        </div>
                      </div>
                      
                      <button className="text-primary-400 hover:text-primary-300 font-medium transition-colors flex items-center">
                        <CreditCard size={18} className="mr-2" />
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;