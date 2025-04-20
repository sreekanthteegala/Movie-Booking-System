import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Lock, CheckCircle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const PaymentForm: React.FC = () => {
  const navigate = useNavigate();
  const { confirmBooking } = useBooking();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [wallet, setWallet] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePaymentMethodChange = (method: 'card' | 'upi' | 'wallet') => {
    setPaymentMethod(method);
  };
  
  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format with spaces after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  
  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    
    return digits;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Process booking
    const bookingId = confirmBooking();
    
    // Navigate to confirmation page
    navigate('/confirmation', { state: { bookingId } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-dark-800 rounded-lg p-6"
    >
      <h3 className="text-xl font-bold text-white mb-6">Payment Method</h3>
      
      <div className="flex space-x-4 mb-6">
        <button
          type="button"
          onClick={() => handlePaymentMethodChange('card')}
          className={`flex-1 py-3 rounded-md border transition-colors duration-200 ${
            paymentMethod === 'card'
              ? 'border-primary-500 bg-primary-500/10 text-primary-400'
              : 'border-dark-600 hover:border-gray-600 text-gray-400'
          }`}
        >
          Credit Card
        </button>
        <button
          type="button"
          onClick={() => handlePaymentMethodChange('upi')}
          className={`flex-1 py-3 rounded-md border transition-colors duration-200 ${
            paymentMethod === 'upi'
              ? 'border-primary-500 bg-primary-500/10 text-primary-400'
              : 'border-dark-600 hover:border-gray-600 text-gray-400'
          }`}
        >
          UPI
        </button>
        <button
          type="button"
          onClick={() => handlePaymentMethodChange('wallet')}
          className={`flex-1 py-3 rounded-md border transition-colors duration-200 ${
            paymentMethod === 'wallet'
              ? 'border-primary-500 bg-primary-500/10 text-primary-400'
              : 'border-dark-600 hover:border-gray-600 text-gray-400'
          }`}
        >
          Wallet
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {paymentMethod === 'card' && (
          <>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-400 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 pl-10 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  maxLength={19}
                />
                <CreditCard size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-400 mb-1">
                Cardholder Name
              </label>
              <input
                id="cardName"
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-400 mb-1">
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    id="expiryDate"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 pl-10 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                    maxLength={5}
                  />
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-400 mb-1">
                  CVV
                </label>
                <div className="relative">
                  <input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="123"
                    className="w-full px-4 py-3 pl-10 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                    maxLength={3}
                  />
                  <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>
          </>
        )}
        
        {paymentMethod === 'upi' && (
          <div>
            <label htmlFor="upiId" className="block text-sm font-medium text-gray-400 mb-1">
              UPI ID
            </label>
            <input
              id="upiId"
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="name@upi"
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        )}
        
        {paymentMethod === 'wallet' && (
          <div>
            <label htmlFor="wallet" className="block text-sm font-medium text-gray-400 mb-1">
              Select Wallet
            </label>
            <select
              id="wallet"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select a wallet</option>
              <option value="paytm">Paytm</option>
              <option value="phonepe">PhonePe</option>
              <option value="amazonpay">Amazon Pay</option>
              <option value="gpay">Google Pay</option>
            </select>
          </div>
        )}
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 rounded-md font-semibold flex items-center justify-center ${
              isProcessing 
                ? 'bg-primary-700 cursor-not-allowed' 
                : 'bg-primary-600 hover:bg-primary-700'
            } text-white transition-colors duration-300`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
          
          <p className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <Lock size={14} className="mr-1" />
            Secure Payment. Your information is protected.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default PaymentForm;