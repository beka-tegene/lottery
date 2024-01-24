import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../Image/logo.gif';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()
  const cardsPerPage = 12;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/lotto/users');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    maxWidth: '100%',
    minWidth: '50%',
  };

  const cardStyle = {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    width: '350px',
    padding: '16px',
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s',
    background: "#7E6363",
    color: 'white'
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '4px',
    cursor: 'pointer',
    backgroundColor: '#38a169',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    outline: 'none',
    transition: 'background-color 0.3s',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e53e3e90',
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const handleConfirmDelete = () => {
    // Implement your delete logic here
    setShowDeletePopup(false);
  };

  const handleSearch = () => {
    // Implement search logic here
    // For now, let's just log the search term
    console.log('Searching for:', searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data?.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(data?.length / cardsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '16px', minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(45deg , #503C3C 50%, #3E3232 50%)" }}
    >
      <motion.div style={containerStyle}>
        <motion.img src={logo} alt="logo" style={{ width: '100px', marginBottom: '16px' }} />
        <motion.h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', margin: '16px 0' }}>
          DAN Energy Crowd Funding
        </motion.h2>
        <p style={{ fontSize: '16px', color: '#A0A0A0' }}>All users registered every two week</p>
        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <motion.button
            style={{
              ...buttonStyle,
              background: "#0B60B0"
            }}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate('/winners')}
          >
            winner page
          </motion.button>
          <div style={{ flexGrow: 1 }}></div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <motion.input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search by phone number"
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #e2e8f0',
                outline: 'none',
                width: '250px', // Adjust the width as needed
                transition: 'border 0.3s',
                background: '#fff',
              }}
            />
            <motion.button
              style={{
                ...buttonStyle,
              }}
              whileHover={{ scale: 1.1 }}
              onClick={handleSearch}
            >
              Search
            </motion.button>
          </div>
        </div>
        {currentCards.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>No records found</p>
        ) : (
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            {currentCards.map((card, index) => (
              <motion.div
                key={index}
                style={{
                  ...cardStyle,
                }}
                whileHover={{ scale: 1.05 }}
                exit={{ opacity: 0, scale: 0.9 }}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.3 }}
              >
                <p>{`No: ${indexOfFirstCard + index + 1}`}</p>
                <p>{`Full Name: ${card.fullName}`}</p>
                <p>{`Age: ${card.age}`}</p>
                <p>{`Status: ${card.status}`}</p>
                <p>{`Invited By: ${card.invitedBy}`}</p>
                <p>{`Phone Number: ${card.phoneNumber}`}</p>
                <motion.button
                  style={{
                    ...deleteButtonStyle,
                    whileHover: { scale: 1.1 },
                  }}
                  onClick={handleDeleteClick}
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
        <AnimatePresence>
          {showDeletePopup && (
            <motion.div
              style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                  width: '300px',
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                  Are you sure you want to delete?
                </p>
                <motion.button style={buttonStyle} onClick={handleConfirmDelete}>
                  Yes
                </motion.button>
                <motion.button style={deleteButtonStyle} onClick={handleCancelDelete}>
                  No
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.button
              key={index}
              style={{
                padding: '6px 8px',
                margin: '2px',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '4px',
                outline: 'none',
                transition: 'background-color 0.3s',
                backgroundColor: currentPage === index + 1 ? '#4299e1' : '#e2e8f0',
                color: currentPage === index + 1 ? '#ffffff' : '#333',
              }}
              onClick={() => handlePageClick(index + 1)}
              whileHover={{ scale: 1.1 }}
            >
              {index + 1}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Table;
