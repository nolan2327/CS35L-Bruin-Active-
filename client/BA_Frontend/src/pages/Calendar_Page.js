import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

// Various components from ../components here
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';


const CalendarPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Bruin Active</h2>
<<<<<<< HEAD
        <button style={styles.profileButton} onClick={() => navigate('/profile_page')}>
          <ProfileIcon />
        </button>
=======
 	<ProfileIcon />
>>>>>>> shubhan-branch
      </div>

      <div style={styles.mainContent}>
        {/* Left Column (Buttons + Gym Occupancy Title) */}
        <div style={styles.leftColumn}>
          <div style={styles.buttonBox}>
            <button style={styles.button} onClick={() => navigate('/')}>
              <HomeIcon />
            </button>
<<<<<<< HEAD
            <button style={styles.button} onClick={() => navigate('/calendar_page')}>
              <CalendarIcon />
            </button>
            <button style={styles.button} onClick={() => navigate('/postboard_page')}>
=======
            <button style={styles.button} onClick={() => navigate('/calendar')}>
              <CalendarIcon />
            </button>
            <button style={styles.button}>
>>>>>>> shubhan-branch
              <DashboardIcon />
            </button>
          </div>
        </div>
        
        {/* Right Column (Calendar) */}
        <div style={styles.rightColumn}>
          <div style={styles.calendarContainer}>
            <Calendar onChange={setDate} value={date} />
          </div>
          <p style={styles.selectedDate}>
            Selected date: {date.toDateString()}
          </p>
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
>>>>>>> shubhan-branch
  },
  headerText: {
    margin: 0,
    fontSize: '36px',
<<<<<<< HEAD
    fontFamily: '"Permanent Marker", cursive', // Ensure Permanent Marker font is used
=======
    fontFamily: 'Lobster', // Change to your preferred font
>>>>>>> shubhan-branch
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
>>>>>>> shubhan-branch
  rightColumn: {
    flex: 1, // Right column takes up remaining space
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Center the calendar vertically and horizontally
    padding: '20px',
    overflowY: 'auto',
  },
  calendarContainer: {
    transform: 'scale(1.5)', // Scale up by 1.5x
    transformOrigin: 'center', // Scale from the center
  },
  selectedDate: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#555',
  },
};

export default CalendarPage;

<<<<<<< HEAD
=======

>>>>>>> shubhan-branch