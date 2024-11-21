import React from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'; // Import the hook
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> shubhan-branch

// Various components from ../components here
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';

const GymOccupancy = () => {
<<<<<<< HEAD
  const navigate = useNavigate(); // Hook to programmatically navigate

=======
  const navigate = useNavigate();
>>>>>>> shubhan-branch
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Bruin Active</h2>
        <button style={styles.profileButton} onClick={() => navigate('/profile_page')}>
          <ProfileIcon />
        </button>
      </div>
      <div style={styles.mainContent}>
        {/* Left Column (Buttons + Gym Occupancy Title) */}
        <div style={styles.leftColumn}>
          <div style={styles.buttonBox}>
<<<<<<< HEAD
            <button style={styles.button} onClick={() => navigate('/')}>
              <HomeIcon />
            </button>
            <button style={styles.button} onClick={() => navigate('/calendar_page')}>
=======
            <button style={styles.button}>1</button>
            <button style={styles.button}>2</button>
            <button style={styles.button}>3</button>
            <button style={styles.button}>
              <HomeIcon />
            </button>
            <button style={styles.button} onClick={() => navigate('/calendar')}>
>>>>>>> shubhan-branch
              <CalendarIcon />
            </button>
            <button style={styles.button} onClick={() => navigate('/postboard_page')}>
              <DashboardIcon />
            </button>
          </div>
        </div>

        {/* Right Column with Gym Occupancy Boxes */}
        <div style={styles.rightColumn}>
          {/* John Wooden Center */}
          <div style={styles.hall}>
            <div style={styles.hallInfo}>
              <strong>John Wooden Center</strong>
            </div>
            <div style={styles.hallDetails}>
              <p style={styles.occupancy}>TEST</p> {/* Display dynamic percentage */}
            </div>
          </div>

          {/* B-Fit */}
          <div style={styles.hall}>
            <div style={styles.hallInfo}>
              <strong>B-Fit</strong>
            </div>
            <div style={styles.hallDetails}>
              <p style={styles.occupancy}>TEST</p> {/* Display dynamic percentage */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Full viewport height
  },
  header: {
    backgroundColor: '#008fdc',
    color: 'white',
    padding: '40px',
    textAlign: 'center',
  },
  headerText: {
    margin: 0,
    fontSize: '36px',
    //fontFamily: '"Permanent Marker", cursive', // Ensure Permanent Marker font is used
    fontFamily: 'Lobster', // Change to your preferred font
    fontFamily: 'Lobster', // Change to your preferred font
    fontFamily: '"Permanent Marker", cursive', // Ensure Permanent Marker font is used
  },
  mainContent: {
    display: 'flex',
    flex: 1,
  },
  leftColumn: {
    width: '10%', // Left column takes 20% of the page width
    height: '100vh', // Full height of the page
    backgroundColor: '#008fdc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center the buttons vertically and horizontally
    paddingTop: '20px',
    boxSizing: 'border-box',
    borderRight: '2px solid #ddd', // Optional: add a border to separate columns
  },
  // buttonBox: {
  //   backgroundColor: '#008fdc',
  //   padding: '20px',
  //   borderRadius: '10px',
  //   width: '30%', // Adjust width of button box
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
    button: {
        backgroundColor: '#fff',
        color: '#008fdc',
        border: 'none',
        padding: '40px', // Adjust to make the button square
        marginBottom: '40px', // Space between buttons (adjust the value as needed)
        borderRadius: '10px',
        cursor: 'pointer',
        width: '80px', // Set width
        height: '80px', // Set height to match width for a square shape
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
    },
  button: {
    backgroundColor: '#fff',
    color: '#008fdc',
    border: 'none',
    padding: '40px', // Adjust to make the button square
    marginBottom: '40px', // Space between buttons (adjust the value as needed)
    borderRadius: '10px',
    cursor: 'pointer',
    width: '80px', // Set width
    height: '80px', // Set height to match width for a square shape
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
  },
<<<<<<< HEAD
  profileButton: {
    backgroundColor: 'transparent', 
    border: 'none',                
    cursor: 'pointer',             // Show pointer cursor
    position: 'absolute',          // Position relative to header
    right: '20px',                 
    top: '20%',                    // Vertically center
    transform: 'translateY(-50%)', // Maintain proper centering
    padding: 0,                    
    outline: 'none',               
  },  
=======
  // buttonBox: {
  //   backgroundColor: '#008fdc',
  //   padding: '20px',
  //   borderRadius: '10px',
  //   width: '30%', // Adjust width of button box
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
>>>>>>> shubhan-branch
  rightColumn: {
    flex: 1, // Right column takes up remaining space
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
    overflowY: 'auto',
  },
  hall: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '10px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px', // Optional: Adjust the max width of the gym boxes
  },
  hallInfo: {
    flexGrow: 1,
  },
  hallDetails: {
    textAlign: 'right',
  },
  occupancy: {
    color: '#28a745', // Green for occupancy percentage
    fontWeight: 'bold',
  },
};

export default GymOccupancy;