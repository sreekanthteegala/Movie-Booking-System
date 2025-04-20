import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden bg-dark-900">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          filter: 'brightness(0.3)'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold font-heading mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Experience Cinema Like Never Before
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Book your tickets with ease, select the perfect seat, and immerse yourself in the magic of the big screen.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a 
            href="#now-showing" 
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-colors duration-300 flex items-center justify-center"
          >
            Book Now
          </a>
          <a 
            href="#"
            className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-full transition-colors duration-300 flex items-center justify-center"
          >
            <Play size={18} className="mr-2" /> Watch Trailers
          </a>
        </motion.div>
        
        {/* Floating scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;