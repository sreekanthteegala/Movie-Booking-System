import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { useMovies } from '../../context/MoviesContext';

const BookingSummary: React.FC = () => {
  const navigate = useNavigate();
  const { 
    selectedMovie, 
    selectedTheater, 
    selectedDate, 
    selectedShowtime,
    selectedSeats,
    totalAmount,
    getShowtimeDetails,
    getTheaterDetails
  } = useBooking();
  
  const { getMovieById } = useMovies();
  
  if (!selectedMovie || !selectedTheater || !selectedDate || !selectedShowtime) {
    return null;
  }
  
  const movie = getMovieById(selectedMovie);
  const theater = getTheaterDetails(selectedTheater);
  const showtime = getShowtimeDetails(selectedShowtime);
  
  if (!movie || !theater || !showtime) {
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    navigate('/checkout');
  };

  return (
    <motion.div 
      className="bg-dark-800 rounded-lg p-6 sticky top-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-dark-700">
        Booking Summary
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
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <MapPin size={18} className="text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-gray-300 font-medium">{theater.name}</p>
            <p className="text-sm text-gray-500">{theater.location}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Calendar size={18} className="text-primary-500 mr-3 flex-shrink-0" />
          <div>
            <p className="text-gray-300">{formatDate(showtime.date)}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock size={18} className="text-primary-500 mr-3 flex-shrink-0" />
          <div>
            <p className="text-gray-300">{showtime.startTime}</p>
          </div>
        </div>
      </div>
      
      {selectedSeats.length > 0 && (
        <div className="mb-6">
          <h4 className="text-white font-medium mb-2">Selected Seats:</h4>
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
      )}
      
      <div className="border-t border-dark-700 pt-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Tickets ({selectedSeats.length})</span>
          <span className="text-gray-300">₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Convenience Fee</span>
          <span className="text-gray-300">₹{(selectedSeats.length * 20).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-dark-700">
          <span className="text-white">Total</span>
          <span className="text-white">₹{(totalAmount + selectedSeats.length * 20).toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={handleProceedToCheckout}
        disabled={selectedSeats.length === 0}
        className={`w-full py-3 rounded-md font-semibold ${
          selectedSeats.length === 0 
            ? 'bg-dark-700 text-gray-500 cursor-not-allowed' 
            : 'bg-primary-600 hover:bg-primary-700 text-white'
        } transition-colors duration-300`}
      >
        {selectedSeats.length === 0 
          ? 'Select Seats to Continue'
          : 'Proceed to Payment'}
      </button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        By proceeding, you agree to our Terms and Conditions.
      </p>
    </motion.div>
  );
};

export default BookingSummary;