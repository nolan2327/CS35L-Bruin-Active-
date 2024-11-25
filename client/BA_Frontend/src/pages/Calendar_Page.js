import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sharedStyles from '../styles/SharedStyles';
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

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate.replace(',', ''); // Remove the comma
  };

return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Bruin Active</h2>
        <button style={styles.profileButton} onClick={() => navigate('/sign_in')}>
          <ProfileIcon />
        </button>
      </div>

      <div style={styles.mainContent}>
        {/* Left Column (Buttons + Gym Occupancy Title) */}
        <div style={styles.leftColumn}>
          <div style={styles.buttonBox}>
            <button style={styles.button} onClick={() => navigate('/')}>
              <HomeIcon />
            </button>
            <button style={styles.button} onClick={() => navigate('/calendar_page')}>
              <CalendarIcon />
            </button>
            <button style={styles.button} onClick={() => navigate('/postboard_page')}>
              <DashboardIcon />
            </button>
          </div>
        </div>
        
        {/* Right Column (Calendar) */}
        <div style={styles.rightColumn}>
          <div style={styles.calendarContainer}>
            <Calendar onChange={setDate} value={date} />
          </div>
          <div style={styles.eventsSection}>
            <p style={styles.eventsText}>Events on {formatDate(date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  ...sharedStyles,
  rightColumn: {
    display: 'flex', // Use flexbox to control layout
    flexDirection: 'row', // Arrange calendar and text side by side
    alignItems: 'flex-start', // Align items at the top
    justifyContent: 'space-between', // Space out the items
    width: '100%', // Use full width of the container
    padding: '20px',
  },
  calendarSection: {
    flex: 1, // Let the calendar take available space
  },
  calendarContainer: {
    transform: 'scale(1.5)', // Scale up by 1.5x
    transformOrigin: 'center', // Scale from the center
    marginTop: '120px',
    marginLeft: '140px',
  },
  eventsSection: {
    flexBasis: '30%', // Define a fixed width or percentage for the events section
    marginRight: '150px', // Add space between calendar and events section
    textAlign: 'center', // Align text to the left
  },
  eventsText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default CalendarPage;
