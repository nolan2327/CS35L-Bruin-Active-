import React from 'react';

<<<<<<< HEAD
// Various components from ../components here
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';

=======
>>>>>>> 1a30d96 (Added basic functionality for the beginning of front-end pages.)
const GymOccupancy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
<<<<<<< HEAD
        <h2 style={styles.headerText} >Bruin Active</h2>
        <ProfileIcon />
      </div>
=======
        <h2 style={styles.headerText}>Bruin Active</h2>
      </div>

>>>>>>> 1a30d96 (Added basic functionality for the beginning of front-end pages.)
      <div style={styles.mainContent}>
        {/* Left Column (Buttons + Gym Occupancy Title) */}
        <div style={styles.leftColumn}>
          <div style={styles.buttonBox}>
<<<<<<< HEAD
            <button style={styles.button}>
              <HomeIcon />
            </button>
            <button style={styles.button}>
              <CalendarIcon />
            </button>
            <button style={styles.button}>
              <DashboardIcon />
            </button>
=======
            <button style={styles.button}>1</button>
            <button style={styles.button}>2</button>
            <button style={styles.button}>3</button>
>>>>>>> 1a30d96 (Added basic functionality for the beginning of front-end pages.)
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
<<<<<<< HEAD
    position: 'relative', // Enable absolute positioning for the icon
=======
>>>>>>> 1a30d96 (Added basic functionality for the beginning of front-end pages.)
  },
  headerText: {
    margin: 0,
    fontSize: '36px',
<<<<<<< HEAD
    fontFamily: '"Permanent Marker", cursive', // Ensure Permanent Marker font is used
=======
    fontFamily: 'Lobster', // Change to your preferred font
>>>>>>> 1a30d96 (Added basic functionality for the beginning of front-end pages.)
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
<<<<<<< HEAD
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
>>>>>>> 1a30d96 (Added basic functionality for the beginning of front-end pages.)
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

<<<<<<< HEAD
export default GymOccupancy;
=======
export default GymOccupancy;
>>>>>>> 1a30d96 (Added basic functionality for the beginning of front-end pages.)
