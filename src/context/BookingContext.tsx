import React, { createContext, useContext, useState } from 'react';
import { Seat, ShowTime, Theater, theaters, showtimes as mockShowtimes } from '../data/mockData';

interface BookingContextType {
  selectedMovie: string | null;
  selectedTheater: string | null;
  selectedDate: string | null;
  selectedShowtime: string | null;
  selectedSeats: string[];
  totalAmount: number;
  
  setSelectedMovie: (movieId: string | null) => void;
  setSelectedTheater: (theaterId: string | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedShowtime: (showtimeId: string | null) => void;
  selectSeat: (seatId: string) => void;
  unselectSeat: (seatId: string) => void;
  clearSelection: () => void;
  getAvailableTheaters: (movieId: string) => Theater[];
  getAvailableDates: (movieId: string, theaterId: string) => string[];
  getAvailableShowtimes: (movieId: string, theaterId: string, date: string) => ShowTime[];
  getShowtimeDetails: (showtimeId: string) => ShowTime | undefined;
  getTheaterDetails: (theaterId: string) => Theater | undefined;
  confirmBooking: () => string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: React.ReactNode;
}

const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const clearSelection = () => {
    setSelectedMovie(null);
    setSelectedTheater(null);
    setSelectedDate(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setTotalAmount(0);
  };

  const getAvailableTheaters = (movieId: string) => {
    const theaterIds = new Set(
      mockShowtimes
        .filter(showtime => showtime.movieId === movieId)
        .map(showtime => showtime.theaterId)
    );
    
    return theaters.filter(theater => theaterIds.has(theater.id));
  };

  const getAvailableDates = (movieId: string, theaterId: string) => {
    const dates = new Set(
      mockShowtimes
        .filter(showtime => 
          showtime.movieId === movieId && 
          showtime.theaterId === theaterId
        )
        .map(showtime => showtime.date)
    );
    
    return Array.from(dates).sort();
  };

  const getAvailableShowtimes = (
    movieId: string, 
    theaterId: string, 
    date: string
  ): ShowTime[] => {
    return mockShowtimes.filter(showtime => 
      showtime.movieId === movieId && 
      showtime.theaterId === theaterId &&
      showtime.date === date
    ).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getShowtimeDetails = (showtimeId: string) => {
    return mockShowtimes.find(showtime => showtime.id === showtimeId);
  };

  const getTheaterDetails = (theaterId: string) => {
    return theaters.find(theater => theater.id === theaterId);
  };

  const selectSeat = (seatId: string) => {
    if (!selectedSeats.includes(seatId)) {
      const updatedSeats = [...selectedSeats, seatId];
      setSelectedSeats(updatedSeats);
      // In a real app, this would calculate based on actual seat prices
      setTotalAmount(updatedSeats.length * 150);
    }
  };

  const unselectSeat = (seatId: string) => {
    const updatedSeats = selectedSeats.filter(id => id !== seatId);
    setSelectedSeats(updatedSeats);
    setTotalAmount(updatedSeats.length * 150);
  };

  const confirmBooking = () => {
    // In a real app, this would call an API to create a booking
    const bookingId = `BK${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    // Reset the booking state
    clearSelection();
    return bookingId;
  };

  const value = {
    selectedMovie,
    selectedTheater,
    selectedDate,
    selectedShowtime,
    selectedSeats,
    totalAmount,
    
    setSelectedMovie,
    setSelectedTheater,
    setSelectedDate,
    setSelectedShowtime,
    selectSeat,
    unselectSeat,
    clearSelection,
    getAvailableTheaters,
    getAvailableDates,
    getAvailableShowtimes,
    getShowtimeDetails,
    getTheaterDetails,
    confirmBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;