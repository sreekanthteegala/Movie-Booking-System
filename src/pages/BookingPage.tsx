import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovies } from '../context/MoviesContext';
import { useBooking } from '../context/BookingContext';
import SeatMap from '../components/booking/SeatMap';
import BookingSummary from '../components/booking/BookingSummary';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovieById } = useMovies();
  const { 
    selectedMovie, 
    selectedTheater,
    selectedDate,
    selectedShowtime,
    setSelectedMovie,
    getTheaterDetails,
    getShowtimeDetails
  } = useBooking();
  
  useEffect(() => {
    // If navigated directly to this page without selections
    if (!selectedMovie || !selectedTheater || !selectedDate || !selectedShowtime) {
      if (id) {
        setSelectedMovie(id);
      }
      navigate(`/movie/${id || selectedMovie}`);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id, navigate, selectedMovie, selectedTheater, selectedDate, selectedShowtime, setSelectedMovie]);
  
  if (!selectedMovie || !selectedTheater || !selectedDate || !selectedShowtime) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        <p className="ml-3 text-gray-400">Loading booking details...</p>
      </div>
    );
  }
  
  const movie = getMovieById(selectedMovie);
  const theater = getTheaterDetails(selectedTheater);
  const showtime = getShowtimeDetails(selectedShowtime);
  
  if (!movie || !theater || !showtime) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Booking Information Not Found</h2>
        <p className="text-gray-400 mb-6">The booking details you're looking for don't exist.</p>
        <button 
          onClick={() => navigate(`/movie/${selectedMovie}`)}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-300"
        >
          Back to Movie
        </button>
      </div>
    );
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
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
          <h1 className="text-3xl font-bold text-white">Select Your Seats</h1>
          <div className="flex flex-wrap items-center text-gray-400 mt-2">
            <span>{movie.title}</span>
            <span className="mx-2">•</span>
            <span>{theater.name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(showtime.date)}</span>
            <span className="mx-2">•</span>
            <span>{showtime.startTime}</span>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-dark-800 rounded-lg p-6">
            <SeatMap />
          </div>
          
          <div>
            <BookingSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;