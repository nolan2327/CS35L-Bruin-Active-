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
        <button style={styles.profileButton} onClick={() => navigate('/profile_page')}>
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
          <p style={styles.selectedDate}>
            Selected date: {formatDate(date)}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  ...sharedStyles,
  calendarContainer: {
    transform: 'scale(1.5)', // Scale up by 1.5x
    transformOrigin: 'center', // Scale from the center
    marginRight: '700px',
    marginBottom: '110px',
 },
  selectedDate: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#555',
    marginRight: '700px',
  },
};

export default CalendarPage;
