import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <div className='tick-icon'>
      <FaCheckCircle className="tick" />
      </div>
      <div className='success-message'>
      <h2>Your payment was successful</h2>
      <p>Thank you for your purchase!</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
