import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sharedStyles from '../styles/SharedStyles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { findEventsByDate } from '../utils/services.js';

// Various components from ../components here
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';
import { AuthContext } from '../utils/IsSignedIn.js';

const CalendarPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate.replace(',', ''); // Remove the comma
  };
  
  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the selected date
    const formattedDate = formatDate(newDate); // Format the selected date
    const eventsOnDate = findEventsByDate(formattedDate); // Call the imported function
    setEvents(eventsOnDate); // Update the events state
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Bruin Active</h2>
        <button style={styles.profileButton} onClick={() => {
          if (isLoggedIn === true) {
            navigate('/profile_page');
          }
          else {
            navigate('/sign_in')
          }
        }}>
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
            <ul style={styles.eventsList}>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <li key={index} style={styles.eventItem}>
                    {event}
                  </li>
                ))
              ) : (
                <p style={styles.noEventsText}>No events scheduled for this date.</p>
              )}
            </ul>
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
  eventsList: {
    marginTop: '50px',
    paddingLeft: '20px',
    listStyleType: 'disc',
  },
  eventItem: {
    fontSize: '16px',
    color: '#555',
  },
  noEventsText: {
    fontSize: '16px',
    color: '#999',
    fontStyle: 'italic',
  },
};
export default CalendarPage;