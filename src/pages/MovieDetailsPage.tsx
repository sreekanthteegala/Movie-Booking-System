import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, Star, ChevronRight, Play } from 'lucide-react';
import { useMovies } from '../context/MoviesContext';
import { useBooking } from '../context/BookingContext';
import MovieList from '../components/movies/MovieList';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovieById, getTopRatedMovies, loading } = useMovies();
  const { 
    setSelectedMovie, 
    selectedTheater, 
    selectedDate,
    setSelectedTheater,
    setSelectedDate,
    setSelectedShowtime,
    getAvailableTheaters,
    getAvailableDates,
    getAvailableShowtimes
  } = useBooking();
  
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      setSelectedMovie(id);
    }
    
    // Reset other selections
    setSelectedTheater(null);
    setSelectedDate(null);
    setSelectedShowtime(null);
    
    // Scroll to top when movie changes
    window.scrollTo(0, 0);
  }, [id, setSelectedMovie, setSelectedTheater, setSelectedDate, setSelectedShowtime]);
  
  if (loading || !id) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        <p className="ml-3 text-gray-400">Loading movie details...</p>
      </div>
    );
  }
  
  const movie = getMovieById(id);
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Movie Not Found</h2>
        <p className="text-gray-400 mb-6">The movie you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-300"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  // Format runtime from minutes to hours and minutes
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const theaters = getAvailableTheaters(id);
  const dates = selectedTheater ? getAvailableDates(id, selectedTheater) : [];
  const showtimes = (selectedTheater && selectedDate) 
    ? getAvailableShowtimes(id, selectedTheater, selectedDate)
    : [];
  
  const handleTheaterSelect = (theaterId: string) => {
    setSelectedTheater(theaterId);
    setSelectedDate(null);
    setSelectedShowtime(null);
    setSelectedShowtimeId(null);
  };
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedShowtime(null);
    setSelectedShowtimeId(null);
  };
  
  const handleShowtimeSelect = (showtimeId: string) => {
    setSelectedShowtime(showtimeId);
    setSelectedShowtimeId(showtimeId);
  };
  
  const handleContinue = () => {
    if (!selectedShowtimeId) return;
    navigate(`/booking/${id}`);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Get current date for comparison
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-dark-900">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.backdropUrl})`,
            filter: 'brightness(0.3)'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <motion.div 
              className="w-48 md:w-64 flex-shrink-0 mb-6 md:mb-0 md:mr-8 rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="w-full h-auto"
              />
            </motion.div>
            
            <motion.div 
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                {movie.genre.map((genre, index) => (
                  <span 
                    key={index}
                    className="text-sm px-3 py-1 bg-dark-700 text-gray-300 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-300 mb-6">
                <div className="flex items-center">
                  <Star size={18} className="text-primary-500 mr-1" />
                  <span>{movie.rating.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-primary-500 mr-1" />
                  <span>{formatRuntime(movie.duration)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="text-primary-500 mr-1" />
                  <span>{new Date(movie.releaseDate).getFullYear()}</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowTrailer(true)}
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors duration-300"
              >
                <Play size={20} className="mr-2" />
                Watch Trailer
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">{movie.synopsis}</p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Cast & Crew</h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Director</h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Starring</h3>
                <div className="flex flex-wrap gap-y-2">
                  {movie.cast.map((actor, index) => (
                    <span key={index} className="text-gray-300 w-1/2 md:w-1/3">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="bg-dark-800 p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Book Tickets</h2>
          
          {/* Theater Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Select Theater</h3>
            <div className="space-y-2">
              {theaters.map(theater => (
                <button
                  key={theater.id}
                  onClick={() => handleTheaterSelect(theater.id)}
                  className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                    selectedTheater === theater.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                >
                  <div className="font-medium">{theater.name}</div>
                  <div className="text-sm opacity-80">{theater.location}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Date Selection */}
          {selectedTheater && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">Select Date</h3>
              <div className="flex overflow-x-auto pb-2 space-x-2">
                {dates.map(date => (
                  <button
                    key={date}
                    onClick={() => handleDateSelect(date)}
                    className={`flex-shrink-0 p-3 rounded-md transition-colors duration-200 ${
                      selectedDate === date
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    } ${date < today ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={date < today}
                  >
                    {formatDate(date)}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Showtime Selection */}
          {selectedDate && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">Select Showtime</h3>
              <div className="grid grid-cols-3 gap-2">
                {showtimes.map(showtime => (
                  <button
                    key={showtime.id}
                    onClick={() => handleShowtimeSelect(showtime.id)}
                    className={`p-2 text-center rounded-md transition-colors duration-200 ${
                      selectedShowtimeId === showtime.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                  >
                    {showtime.startTime}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={handleContinue}
            disabled={!selectedShowtimeId}
            className={`w-full py-3 rounded-md font-semibold flex items-center justify-center ${
              !selectedShowtimeId
                ? 'bg-dark-700 text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            } transition-colors duration-300`}
          >
            Continue
            <ChevronRight size={18} className="ml-1" />
          </button>
        </motion.div>
      </div>
      
      {/* Similar Movies */}
      <div className="border-t border-dark-700">
        <MovieList 
          title="You May Also Like" 
          movies={getTopRatedMovies().filter(m => m.id !== id)} 
        />
      </div>
      
      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary-400 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="aspect-video bg-dark-800">
              <iframe
                src={movie.trailerUrl}
                title={`${movie.title} Trailer`}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;