import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sharedStyles from '../styles/SharedStyles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { findEventsByDate, findImage } from '../utils/services.js';
import { AuthContext } from '../utils/IsSignedIn.js';
import { bufferToBase64 } from '../utils/ImageConversion.js';
// Various components from ../components here
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';
const CalendarPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, mainUser } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [profPic, setProfPic] = useState(null);
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate.replace(',', ''); // Remove the comma
  };
  const handleDateChange = async (newDate) => {
    setDate(newDate); // Update the selected date
    const formattedDate = formatDate(newDate); // Format the selected date
    try {
      const eventsOnDate = await findEventsByDate(formattedDate); // Call the imported async function
      if (eventsOnDate.error) {
        setEvents([]); // If there’s an error, reset events
      } else {
        // Check the structure of the returned data and handle accordingly
        // For example, if the events are in `eventsOnDate.data`, adjust as necessary
        const eventsArray = Array.isArray(eventsOnDate) ? eventsOnDate : eventsOnDate.data || [];
        setEvents(eventsArray); // Update the events state with the fetched data
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]); // Reset events if an error occurs
    }
  };

  // Adding function to display the profile picture of the user
  useEffect(() => {
    const getProfPic = async () => {
      // Getting the profile picture of the user
      const image = await findImage(mainUser);
      // If there is one then we set the value of profPic
      if (image) {
        const base64string = bufferToBase64(image[0].data.data);
        setProfPic(`data:${image.mimetype};base64,${base64string}`);
      }
    };
    getProfPic();
  }, []);

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
          {profPic ? (
            <img
              src={profPic}
              alt="Profile"
              style={styles.profileImage}
            />
          ) : (
            <ProfileIcon />
          )}
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
            <Calendar onChange={handleDateChange} value={date} />
          </div>
          <div style={styles.eventsSection}>
            <p style={styles.eventsText}>Events on {formatDate(date)}</p>
            <ul style={styles.eventsList}>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <li key={index} style={styles.eventItem}>
                    <p><strong>{event.title}</strong></p>
                    {event.start_date == event.end_date ? (
                      <p>{event.start_date}</p>) : (
                      <p>{event.start_date} - {event.end_date}</p>)}
                    <p>Location: {event.location || "TBA"}</p>
                    <p>{event.description}</p>
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
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginTop: '75px',
  },
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
    marginRight: '175px', // Add space between calendar and events section
    textAlign: 'left', // Align text to the left
  },
  eventsText: {
    marginLeft: '100px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  eventsList: {
    marginTop: '50px',
    marginRight: '20px',
    paddingLeft: '50px',
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


