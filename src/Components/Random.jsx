import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import logo from '../Image/logo.gif'
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const Random = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(null);
  const [data, setData] = useState([]);
  const [reloadTimer, setReloadTimer] = useState(null);
  useEffect(() => {
    const fetchRandomPhoneNumber = async () => {
      if (spinning) {
        try {
          const response = await fetch('http://localhost:5000/api/v1/lotto/randomPhoneNumber');
          const data = await response.json();
          if (data) {
            setPhoneNumber(data);
            console.log(phoneNumber);
            setSpinning(false);
            setLoading(false);

            // Set a timer to reload the page after 2 minutes
            const timer = setTimeout(() => {
              window.location.reload();
            }, 15000); // 2 minutes in milliseconds

            setReloadTimer(timer);
          }
        } catch (error) {
          console.error('Error fetching random phone number:', error);
        }
      }
    };

    fetchRandomPhoneNumber();

    return () => {
      clearTimeout(reloadTimer);
    };
  }, [spinning, phoneNumber, reloadTimer]);

  useEffect(() => {
    const fetchWinnersInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/lotto/winnersinfo');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching winners info:', error);
      }
    };

    fetchWinnersInfo();
  }, []);
  const today = new Date().toLocaleDateString("en-US");
  const TodayWinner = data?.filter(item => {
    const itemDate = new Date(item.timestamp).toLocaleDateString("en-US");
    return today === itemDate;
  });
  const generateRandomNumber = () => {
    setLoading(true);
    setSpinning(true);
  };
  const navigate = useNavigate()
  return (
    <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(45deg , #503C3C 50%, #3E3232 50%)" }}>
      {spinning === false && <Confetti />}
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
          position: 'absolute',
          top: '0',
          right: '0',
          // width: "100%"
        }}
        onClick={() => navigate('/location')}
      >Location</button>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center", width: '400px',
          borderRadius: '4px', background: "#F1F2ED", padding: 16,
        }}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: "center" }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>DAN Energy Crowd Funding</h2>
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
                width: "100%"
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
            <div style={{ width: "fit-content", height: "6vh", maxWidth: "300px", maxHeight: "7vh", border: "1px solid #019328", display: 'flex', flexDirection: 'column', justifyContent: "center", borderRadius: '4px', overflow: "hidden", padding: "10px" }}>
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
                {spinning ? 'Spinning...' : phoneNumber?.phoneNumber}
              </motion.h1>

            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: "20px",
          left: '15%',
          zIndex: 2,
          // textAlign: "center",
          width: '300px',
          borderRadius: '4px',
          background: "#F1F2ED",
          padding: 16,
        }}

      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#8758FF', marginBottom: '16px' }}>
          Today's winners
        </h2>
        <ol style={{ paddingLeft: "40px", fontSize: '24px', fontWeight: 'bold' }}>
          {TodayWinner?.map((_, index) => (
            <motion.li
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#272727',
                marginTop: '8px',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {_.phoneNumber}
            </motion.li>
          ))}

        </ol>
      </motion.div>
    </div>
  );
};

export default Random;
