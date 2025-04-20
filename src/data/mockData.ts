// Mock data for the movie booking system

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  genre: string[];
  duration: number; // in minutes
  releaseDate: string;
  rating: number;
  director: string;
  cast: string[];
  synopsis: string;
  trailerUrl: string;
}

export interface ShowTime {
  id: string;
  movieId: string;
  theaterId: string;
  startTime: string;
  date: string;
  price: number;
  availableSeats: number;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bookingHistory: Booking[];
}

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  showTimeId: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'reserved' | 'selected' | 'unavailable';
  type: 'standard' | 'premium' | 'vip';
  price: number;
}

export const movies: Movie[] = [
  {
    id: "m1",
    title: "Interstellar: Beyond Time",
    posterUrl: "https://images.pexels.com/photos/2726370/pexels-photo-2726370.jpeg?auto=compress&cs=tinysrgb&w=600",
    backdropUrl: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    duration: 165,
    releaseDate: "2023-10-26",
    rating: 9.2,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    synopsis: "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in search of a new home for humanity, facing unimaginable dangers and challenges in their mission to save mankind.",
    trailerUrl: "https://www.youtube.com/embed/2LqzF5WauAw",
  },
  {
    id: "m2",
    title: "Eternal Sunshine",
    posterUrl: "https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg?auto=compress&cs=tinysrgb&w=600",
    backdropUrl: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Romance", "Sci-Fi", "Drama"],
    duration: 130,
    releaseDate: "2023-11-12",
    rating: 8.7,
    director: "Michel Gondry",
    cast: ["Jim Carrey", "Kate Winslet", "Kirsten Dunst"],
    synopsis: "After a painful breakup, a couple undergoes a procedure to erase each other from their memories, only to discover what they had together might be worth keeping.",
    trailerUrl: "https://www.youtube.com/embed/07-QBnEkgXU",
  },
  {
    id: "m3",
    title: "The Quantum Paradox",
    posterUrl: "https://images.pexels.com/photos/4065906/pexels-photo-4065906.jpeg?auto=compress&cs=tinysrgb&w=600",
    backdropUrl: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Thriller", "Mystery", "Sci-Fi"],
    duration: 142,
    releaseDate: "2023-12-08",
    rating: 8.4,
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Emily Blunt", "Idris Elba"],
    synopsis: "A physicist discovers a way to see multiple timelines, becoming entangled in a conspiracy that threatens the very fabric of reality.",
    trailerUrl: "https://www.youtube.com/embed/gCcx85zbxz4",
  },
  {
    id: "m4",
    title: "The Last Kingdom",
    posterUrl: "https://images.pexels.com/photos/14684626/pexels-photo-14684626.jpeg?auto=compress&cs=tinysrgb&w=600",
    backdropUrl: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Action", "Adventure", "History"],
    duration: 156,
    releaseDate: "2023-09-15",
    rating: 8.9,
    director: "Ridley Scott",
    cast: ["Tom Hardy", "Florence Pugh", "Oscar Isaac"],
    synopsis: "In a world torn by war, a reluctant hero must rise to unite the fractured kingdoms against a common enemy before all is lost.",
    trailerUrl: "https://www.youtube.com/embed/xaYSUzFaN5I",
  },
  {
    id: "m5",
    title: "Whispers in the Dark",
    posterUrl: "https://images.pexels.com/photos/15676436/pexels-photo-15676436/free-photo-of-silhouette-of-a-person-against-the-night-sky.jpeg?auto=compress&cs=tinysrgb&w=600",
    backdropUrl: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Horror", "Thriller", "Mystery"],
    duration: 118,
    releaseDate: "2023-10-31",
    rating: 7.8,
    director: "James Wan",
    cast: ["Ana de Armas", "Daniel Kaluuya", "Toni Collette"],
    synopsis: "A paranormal investigator with a troubled past is called to a remote mansion where she must confront both supernatural horrors and her own demons.",
    trailerUrl: "https://www.youtube.com/embed/xhJ5P7Up3jA",
  },
  {
    id: "m6",
    title: "Lost in Tokyo",
    posterUrl: "https://images.pexels.com/photos/34639/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    backdropUrl: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Drama", "Comedy", "Romance"],
    duration: 124,
    releaseDate: "2023-08-18",
    rating: 8.3,
    director: "Sofia Coppola",
    cast: ["Scarlett Johansson", "Timothée Chalamet", "Zendaya"],
    synopsis: "Two strangers from different backgrounds meet in the bustling city of Tokyo and form an unexpected connection that changes both their lives.",
    trailerUrl: "https://www.youtube.com/embed/sU0oZsqeG_s",
  }
];

export const theaters: Theater[] = [
  {
    id: "t1",
    name: "Cineplex Royal",
    location: "Downtown, Main Street"
  },
  {
    id: "t2",
    name: "IMAX Experience",
    location: "North Mall, Cinema Boulevard"
  },
  {
    id: "t3",
    name: "Starlight Cinema",
    location: "Westfield Shopping Center"
  }
];

export const showtimes: ShowTime[] = generateShowtimes();

function generateShowtimes() {
  const showtimes: ShowTime[] = [];
  const dates = [
    "2025-05-01", "2025-05-02", "2025-05-03", "2025-05-04", "2025-05-05"
  ];
  const times = [
    "10:00", "12:30", "15:00", "17:30", "20:00", "22:30"
  ];

  let id = 1;
  
  movies.forEach(movie => {
    theaters.forEach(theater => {
      dates.forEach(date => {
        // Not all movies show at all times in all theaters
        const timesToUse = times.slice(0, Math.floor(Math.random() * 4) + 2);
        
        timesToUse.forEach(time => {
          showtimes.push({
            id: `st${id++}`,
            movieId: movie.id,
            theaterId: theater.id,
            date,
            startTime: time,
            price: Math.floor(Math.random() * 6) * 10 + 100, // Random price between 100-150
            availableSeats: Math.floor(Math.random() * 30) + 70 // Random available seats between 70-100
          });
        });
      });
    });
  });

  return showtimes;
}

export const generateSeats = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
  const seats: Seat[] = [];
  
  rows.forEach(row => {
    for (let i = 1; i <= 16; i++) {
      // Determine seat type based on row
      let type: 'standard' | 'premium' | 'vip';
      let price: number;
      
      if (['A', 'B', 'C'].includes(row)) {
        type = 'standard';
        price = 100;
      } else if (['D', 'E', 'F', 'G'].includes(row)) {
        type = 'premium';
        price = 150;
      } else {
        type = 'vip';
        price = 200;
      }
      
      // Generate random status, but majority should be available
      const random = Math.random();
      let status: 'available' | 'reserved' | 'unavailable' = 'available';
      
      if (random < 0.2) {
        status = 'unavailable';
      } else if (random < 0.3) {
        status = 'reserved';
      }
      
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        status,
        type,
        price
      });
    }
  });
  
  return seats;
};

export const seats = generateSeats();