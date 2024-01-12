import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import logo from '../Image/logo.gif'
const DUMMYPHONE = [
  { phone: '0941729595' },
  { phone: '0941729535' },
  { phone: '0941729525' },
  { phone: '0922857673' },
  { phone: '0941729295' },
  { phone: '0941723295' },
  { phone: '0941724595' },
  { phone: '0943459595' },
];

const Random = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (spinning) {
        const randomIndex = Math.floor(Math.random() * DUMMYPHONE.length);
        const newPhoneNumber = DUMMYPHONE[randomIndex].phone;
        setPhoneNumber(newPhoneNumber);
        setSpinning(false);
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [spinning]);

  const generateRandomNumber = () => {
    setLoading(true);
    setSpinning(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{textAlign:"center",width: '400px',
      borderRadius: '4px',background:"#7E6363", padding: 16,}}
      >
      <img src={logo} alt="logo" style={{ width: "100px" }} />
      <div
        style={{
          
          color: '#272727',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
         
          
        }}

      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>DAN Lottery</h2>
          <p style={{ fontSize: '16px', color: '#A0A0A0' }}>Click the button to generate a random phone number</p>
          <button
            style={{
              cursor: 'pointer',
              padding: '.5rem 1rem',
              background: '#8758ff',
              border: '1px solid #8758ff',
              borderRadius: '4px',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
            onClick={generateRandomNumber}
            disabled={loading || spinning}
          >
            {loading ? (
              <ClipLoader size={15} color={'#FFFFFF'} loading={loading} css={css`display: inline-block;`} />
            ) : (
              'Spin Wheel'
            )}
          </button>

          <motion.h1
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: loading ? '#A0A0A0' : '#00FF00',
              marginTop: '8px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {spinning ? 'Spinning...' : phoneNumber}
          </motion.h1>
        </div>
      </div>
    </motion.div>
  );
};

export default Random;
