import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Printer, Download, Share2 } from 'lucide-react';

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId;
  
  useEffect(() => {
    // If navigated directly to this page without a booking ID
    if (!bookingId) {
      navigate('/');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [bookingId, navigate]);
  
  if (!bookingId) {
    return null;
  }
  
  return (
    <div className="bg-dark-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="bg-dark-800 rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Header */}
          <div className="bg-primary-600 px-6 py-8 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center mb-4"
            >
              <div className="rounded-full bg-white w-20 h-20 flex items-center justify-center">
                <CheckCircle size={50} className="text-primary-600" />
              </div>
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Booking Confirmed!</h1>
            <p className="text-primary-100 mt-2">Your tickets have been booked successfully.</p>
          </div>
          
          {/* Ticket Details */}
          <div className="p-6 md:p-8">
            <div className="mb-6 text-center">
              <div className="text-gray-400 text-sm">Booking Reference</div>
              <div className="text-2xl font-mono font-bold text-white tracking-wider">{bookingId}</div>
            </div>
            
            <div className="border-t border-dark-700 my-6"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Ticket Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400">Movie</div>
                    <div className="text-white">Interstellar: Beyond Time</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400">Date & Time</div>
                    <div className="text-white">May 2, 2025 • 7:30 PM</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400">Seats</div>
                    <div className="text-white">F7, F8, F9</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Theater Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400">Theater</div>
                    <div className="text-white">Cineplex Royal</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400">Address</div>
                    <div className="text-white">Downtown, Main Street</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400">Screen</div>
                    <div className="text-white">Screen 3</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-dark-700 my-6"></div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Payment Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Amount Paid</div>
                  <div className="text-white">₹670.00</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Payment Method</div>
                  <div className="text-white">Credit Card</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Transaction ID</div>
                  <div className="text-white">TXN87654321</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Payment Status</div>
                  <div className="text-primary-400 font-medium">Paid</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-dark-700 my-6"></div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Important Information</h3>
              
              <ul className="text-gray-300 list-disc pl-5 space-y-2">
                <li>Please arrive at least 15 minutes before the showtime.</li>
                <li>Show the QR code at the entrance for contactless entry.</li>
                <li>Outside food and beverages are not allowed in the theater.</li>
                <li>Recording during the movie is strictly prohibited.</li>
              </ul>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md font-medium flex items-center justify-center transition-colors">
                <Printer size={18} className="mr-2" />
                Print Ticket
              </button>
              
              <button className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-3 rounded-md font-medium flex items-center justify-center transition-colors">
                <Download size={18} className="mr-2" />
                Download
              </button>
              
              <button className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-3 rounded-md font-medium flex items-center justify-center transition-colors">
                <Share2 size={18} className="mr-2" />
                Share
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => navigate('/')}
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmationPage;