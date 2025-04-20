import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../../data/mockData';

interface MovieListProps {
  title: string;
  movies: Movie[];
  id?: string;
}

const MovieList: React.FC<MovieListProps> = ({ title, movies, id }) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <section id={id} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center">
          <span className="h-6 w-1 bg-primary-500 mr-3 rounded-sm"></span>
          {title}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;