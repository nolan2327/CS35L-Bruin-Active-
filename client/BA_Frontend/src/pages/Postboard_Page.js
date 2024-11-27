import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import sharedStyles from '../styles/SharedStyles';
import { AuthContext } from '../utils/IsSignedIn';
// Various components from ../components here
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';

const Board = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText} >Bruin Active</h2>
        <button style={styles.profileButton} onClick={() => {
          if (isLoggedIn === true) {
            navigate('/');
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

        <div>
          This is a test of the postboard page...
        </div>
      </div>
    </div>
  );
};

const styles = {
  ...sharedStyles,
};

export default Board;
