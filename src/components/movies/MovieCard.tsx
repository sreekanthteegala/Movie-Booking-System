import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie } from '../../data/mockData';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index = 0 }) => {
  const navigate = useNavigate();

  // Format runtime from minutes to hours and minutes
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <motion.div 
      className="group relative bg-dark-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-dark-900/80 text-primary-400 px-2 py-1 rounded-md text-sm font-semibold flex items-center">
          <Star size={14} className="mr-1 fill-primary-400 text-primary-400" />
          {movie.rating.toFixed(1)}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{movie.title}</h3>
        
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <Clock size={14} className="mr-1" />
          <span>{formatRuntime(movie.duration)}</span>
          <span className="mx-2">•</span>
          <span>{movie.genre.slice(0, 2).join(', ')}</span>
        </div>
        
        <p className="text-sm text-gray-400 line-clamp-2 mb-4">{movie.synopsis}</p>
        
        <div className="mt-auto">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded transition-colors duration-300"
          >
            Book Tickets
          </button>
        </div>
      </div>
      
      {/* Hover overlay for the entire card */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default MovieCard;