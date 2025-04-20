import React from 'react';
import Hero from '../components/home/Hero';
import MovieList from '../components/movies/MovieList';
import { useMovies } from '../context/MoviesContext';
import { motion } from 'framer-motion';
import { Film, Star, Calendar, Ticket } from 'lucide-react';

const HomePage: React.FC = () => {
  const { movies, loading, getTopRatedMovies, getNewReleases } = useMovies();
  
  return (
    <div className="bg-dark-900 text-white">
      <Hero />
      
      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              The Ultimate Cinema Experience
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything you need for a perfect movie night, all in one place
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-dark-700 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Film className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Latest Movies</h3>
              <p className="text-gray-400">Get access to the newest releases as soon as they hit the theaters.</p>
            </motion.div>
            
            <motion.div 
              className="bg-dark-700 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Star className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
              <p className="text-gray-400">Enjoy state-of-the-art sound and projection in our luxury theaters.</p>
            </motion.div>
            
            <motion.div 
              className="bg-dark-700 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Calendar className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-400">Book your favorite seats in advance with our simple booking system.</p>
            </motion.div>
            
            <motion.div 
              className="bg-dark-700 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Ticket className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Special Offers</h3>
              <p className="text-gray-400">Get discounts, combo deals, and special promotions for frequent moviegoers.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {loading ? (
        <div className="py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          <p className="mt-2 text-gray-400">Loading movies...</p>
        </div>
      ) : (
        <>
          <MovieList 
            id="now-showing"
            title="Now Showing" 
            movies={movies} 
          />
          
          <MovieList 
            title="Top Rated" 
            movies={getTopRatedMovies()} 
          />
          
          <MovieList 
            title="New Releases" 
            movies={getNewReleases()} 
          />
        </>
      )}
      
      {/* Promo Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-dark-900 via-primary-900 to-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Download our app for exclusive offers
              </motion.h2>
              <motion.p 
                className="text-gray-300 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Get special discounts, early access to ticket sales, and personalized recommendations.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <button className="px-6 py-3 bg-white text-dark-900 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300">
                  App Store
                </button>
                <button className="px-6 py-3 bg-dark-900 text-white font-semibold rounded-md hover:bg-dark-800 transition-colors duration-300">
                  Google Play
                </button>
              </motion.div>
            </div>
            <motion.div 
              className="md:w-1/3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-80">
                <div className="absolute top-0 right-0 w-60 h-80 bg-dark-800 rounded-lg transform rotate-6 shadow-lg"></div>
                <div className="absolute top-0 right-4 w-60 h-80 bg-dark-700 rounded-lg transform -rotate-3 shadow-lg"></div>
                <div className="absolute top-0 right-8 w-60 h-80 bg-dark-600 rounded-lg shadow-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-500">CinemaSelect App</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;