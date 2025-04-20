import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie, movies as mockMovies } from '../data/mockData';

interface MoviesContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  getMovieById: (id: string) => Movie | undefined;
  getTopRatedMovies: () => Movie[];
  getNewReleases: () => Movie[];
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};

interface MoviesProviderProps {
  children: React.ReactNode;
}

const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setMovies(mockMovies);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getMovieById = (id: string) => {
    return movies.find(movie => movie.id === id);
  };

  const getTopRatedMovies = () => {
    return [...movies].sort((a, b) => b.rating - a.rating).slice(0, 4);
  };

  const getNewReleases = () => {
    return [...movies].sort((a, b) => 
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    ).slice(0, 4);
  };

  const value = {
    movies,
    loading,
    error,
    getMovieById,
    getTopRatedMovies,
    getNewReleases
  };

  return (
    <MoviesContext.Provider value={value}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;