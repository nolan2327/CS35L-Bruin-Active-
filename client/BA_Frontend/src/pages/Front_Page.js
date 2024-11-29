import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import sharedStyles from '../styles/SharedStyles';
import { getAllGymData } from '../utils/services';

// Various components from ../components here
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';
import { AuthContext } from '../utils/IsSignedIn';

const GymOccupancy = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { isLoggedIn } = useContext(AuthContext);

  const [bfitTotal, setBfitTotal] = useState(null);
  const [woodenTotal, setWoodenTotal] = useState(null);

  useEffect(() => {
    console.log('Calling for data');
    const fetchData = async () => {
      try {
        const data = await getAllGymData(); // Run function to get all gym data
        if (data && data.bfit && data.wooden) { // If all data isn't null, it was effectively received 
          setBfitTotal(data.bfit.total || 0);  // Set BfitTotal (Wooden) total to value collected or 0
          setWoodenTotal(data.wooden.total || 0); 
        }
      } catch (error) { // If all data wasn't properly received throw an error
        console.error("Error fetching gym data:", error);
      }
    };
    fetchData(); // Call to get data (function defined above)
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Bruin Active</h2>
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

        {/* Right Column with Gym Occupancy Boxes */}
        <div style={styles.rightColumn}>
          {/* John Wooden Center */}
          <div style={styles.hall}>
            <div style={styles.hallInfo}>
              <strong>John Wooden Center</strong>
            </div>
            <div style={styles.hallDetails}>
              <p style={styles.occupancy}>
                {woodenTotal !== null ? `${woodenTotal}` : 'Loading...'}
              </p>
            </div>
          </div>

          {/* B-Fit */}
          <div style={styles.hall}>
            <div style={styles.hallInfo}>
              <strong>B-Fit</strong>
            </div>
            <div style={styles.hallDetails}>
              <p style={styles.occupancy}>
                {bfitTotal !== null ? `${bfitTotal}` : 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  ...sharedStyles,
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
