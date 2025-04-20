import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovies } from '../context/MoviesContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import PaymentForm from '../components/checkout/PaymentForm';
import AuthModal from '../components/common/AuthModal';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    selectedMovie, 
    selectedTheater,
    selectedDate,
    selectedShowtime,
    selectedSeats,
    totalAmount,
    getTheaterDetails,
    getShowtimeDetails
  } = useBooking();
  
  const { getMovieById } = useMovies();
  const { isLoggedIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  
  useEffect(() => {
    // If navigated directly to this page without selections
    if (!selectedMovie || !selectedTheater || !selectedDate || !selectedShowtime || selectedSeats.length === 0) {
      navigate('/');
      return;
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [navigate, selectedMovie, selectedTheater, selectedDate, selectedShowtime, selectedSeats]);
  
  useEffect(() => {
    // If not logged in, show auth modal
    if (!isLoggedIn) {
      setShowAuthModal(true);
    }
  }, [isLoggedIn]);
  
  if (!selectedMovie || !selectedTheater || !selectedDate || !selectedShowtime || selectedSeats.length === 0) {
    return null;
  }
  
  const movie = getMovieById(selectedMovie);
  const theater = getTheaterDetails(selectedTheater);
  const showtime = getShowtimeDetails(selectedShowtime);
  
  if (!movie || !theater || !showtime) {
    return null;
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
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
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
          <p className="text-gray-400 mt-2">Complete your payment to confirm your booking</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PaymentForm />
          </div>
          
          <div>
            <motion.div 
              className="bg-dark-800 rounded-lg p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-dark-700">
                Order Summary
              </h3>
              
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/3 aspect-[2/3] rounded overflow-hidden">
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">{movie.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{movie.genre.join(', ')}</p>
                    <p className="text-sm text-gray-400 mt-2">{theater.name}</p>
                    <p className="text-sm text-gray-400">{formatDate(showtime.date)} • {showtime.startTime}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-white font-medium mb-2">Tickets:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(seatId => (
                    <span 
                      key={seatId}
                      className="bg-dark-700 text-primary-400 px-2 py-1 rounded text-sm"
                    >
                      {seatId}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-dark-700 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Tickets ({selectedSeats.length})</span>
                  <span className="text-gray-300">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Convenience Fee</span>
                  <span className="text-gray-300">₹{(selectedSeats.length * 20).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-gray-300">₹{(totalAmount * 0.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-dark-700">
                  <span className="text-white">Total</span>
                  <span className="text-white">₹{(totalAmount + selectedSeats.length * 20 + totalAmount * 0.18).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          mode="login" 
          onClose={() => setShowAuthModal(false)}
          onToggleMode={() => {}}
        />
      )}
    </div>
  );
};

export default CheckoutPage;