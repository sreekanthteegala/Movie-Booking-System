import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-primary-500 font-heading font-bold text-2xl">Cinema</span>
              <span className="text-white font-heading font-bold text-2xl">Select</span>
            </div>
            <p className="text-sm mb-4">
              Your premier destination for the ultimate movie experience. Book tickets, choose seats, and enjoy the show!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition">Movies</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition">Theaters</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition">Upcoming Releases</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition">Offers & Promos</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition">Gift Cards</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Download Our App</h3>
            <p className="text-sm mb-4">Get the best movie experience on your mobile device</p>
            <div className="space-y-3">
              <a href="#" className="block px-4 py-2 border border-gray-700 rounded-md text-center hover:bg-dark-800 transition">
                App Store
              </a>
              <a href="#" className="block px-4 py-2 border border-gray-700 rounded-md text-center hover:bg-dark-800 transition">
                Google Play
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
          <p>© {new Date().getFullYear()} CinemaSelect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;