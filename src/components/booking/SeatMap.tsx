import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { seats, Seat } from '../../data/mockData';

const SeatMap: React.FC = () => {
  const { selectedSeats, selectSeat, unselectSeat } = useBooking();
  const [allSeats, setAllSeats] = useState<Seat[]>(seats);
  
  // Group seats by row
  const seatsByRow = allSeats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);
  
  // Sort rows alphabetically
  const sortedRows = Object.keys(seatsByRow).sort();
  
  // Handle seat selection
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'unavailable' || seat.status === 'reserved') {
      return;
    }
    
    const isSelected = selectedSeats.includes(seat.id);
    if (isSelected) {
      unselectSeat(seat.id);
    } else {
      selectSeat(seat.id);
    }
  };
  
  // Get status for a seat
  const getSeatStatus = (seat: Seat): 'available' | 'selected' | 'unavailable' | 'reserved' => {
    if (selectedSeats.includes(seat.id)) {
      return 'selected';
    }
    return seat.status;
  };
  
  // Get color class based on seat status
  const getSeatColorClass = (status: string, type: string): string => {
    if (status === 'selected') {
      return 'bg-primary-500 text-white border-primary-600';
    }
    if (status === 'unavailable' || status === 'reserved') {
      return 'bg-dark-700 text-dark-500 border-dark-600 cursor-not-allowed opacity-50';
    }
    
    // Available seats by type
    switch (type) {
      case 'vip':
        return 'bg-dark-800 text-accent-400 border-accent-900 hover:bg-accent-900/20';
      case 'premium':
        return 'bg-dark-800 text-secondary-400 border-secondary-900 hover:bg-secondary-900/20';
      default:
        return 'bg-dark-800 text-gray-400 border-gray-700 hover:bg-gray-700/30';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Screen */}
      <div className="relative mb-10">
        <div className="w-full h-6 bg-gradient-to-b from-primary-500/50 to-transparent rounded-t-full"></div>
        <div className="w-11/12 h-2 mx-auto bg-primary-500/30"></div>
        <div className="text-center text-sm text-gray-400 mt-2">SCREEN</div>
      </div>
      
      {/* Seat Legend */}
      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-dark-800 border border-gray-700 mr-2"></div>
          <span className="text-sm text-gray-400">Standard</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-dark-800 border border-secondary-900 mr-2"></div>
          <span className="text-sm text-gray-400">Premium</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-dark-800 border border-accent-900 mr-2"></div>
          <span className="text-sm text-gray-400">VIP</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-primary-500 border border-primary-600 mr-2"></div>
          <span className="text-sm text-gray-400">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-dark-700 border border-dark-600 opacity-50 mr-2"></div>
          <span className="text-sm text-gray-400">Unavailable</span>
        </div>
      </div>
      
      {/* Seat Map */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[640px]">
          {sortedRows.map((row) => (
            <div key={row} className="flex mb-2 items-center">
              <div className="w-6 text-center font-semibold text-gray-500 mr-2">{row}</div>
              
              <div className="flex justify-center flex-grow gap-1">
                {seatsByRow[row].map((seat) => {
                  const status = getSeatStatus(seat);
                  const colorClass = getSeatColorClass(status, seat.type);
                  
                  return (
                    <motion.button
                      key={seat.id}
                      whileTap={{ scale: status !== 'unavailable' ? 0.9 : 1 }}
                      className={`w-7 h-7 rounded-sm text-xs font-semibold border flex items-center justify-center transition-colors duration-200 ${colorClass}`}
                      onClick={() => handleSeatClick(seat)}
                      disabled={status === 'unavailable' || status === 'reserved'}
                      aria-label={`Seat ${seat.id}, ${status}`}
                    >
                      {seat.number}
                    </motion.button>
                  );
                })}
              </div>
              
              <div className="w-6 text-center font-semibold text-gray-500 ml-2">{row}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatMap;