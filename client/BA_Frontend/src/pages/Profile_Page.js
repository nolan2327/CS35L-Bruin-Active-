import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import sharedStyles from '../styles/SharedStyles';

// Various components from ../components here
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';
import EditIcon from '../components/EditIcon';
import LogoutIcon from '../components/LogoutIcon';
import { AuthContext } from '../utils/IsSignedIn';
import { findProfile } from '../utils/services';


const Profiles = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { isLoggedIn, mainUser, SiSwitch } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(mainUser);
    const getUserInfo = async () => {
      try {
        const profile = await findProfile(mainUser);
        setUserInfo(profile);
      } catch (error) {
        setError(error);
      }
    };

    getUserInfo();
  }, [mainUser]);

  return (
    <div style={sharedStyles.container}>
      <div style={sharedStyles.header}>
        <h2 style={sharedStyles.headerText}>Bruin Active</h2>
        <button
          style={sharedStyles.profileButton}
          onClick={() => {
            if (isLoggedIn === true) {
              navigate('/');
            } else {
              navigate('/sign_in');
            }
          }}
        >
          <ProfileIcon />
        </button>
      </div>
      <div style={sharedStyles.mainContent}>
        {/* Left Column (Buttons + Gym Occupancy Title) */}
        <div style={sharedStyles.leftColumn}>
          <div style={sharedStyles.buttonBox}>
            <button style={sharedStyles.button} onClick={() => {
              navigate('/');
            }}>
              <HomeIcon />
            </button>
            <button style={sharedStyles.button} onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("CLICKED");
              navigate('/calendar_page');
            }}>
              <CalendarIcon />
            </button>
            <button style={sharedStyles.button} onClick={() => navigate('/postboard_page')}>
              <DashboardIcon />
            </button>
          </div>
        </div>

        <div>

          <button style={styles.profPageButton} onClick={() => navigate('/edit_profile')}>
            <EditIcon />
          </button>

          <button style={styles.profPageButton} onClick={() => { SiSwitch(); navigate('/'); }}>
            <LogoutIcon />
          </button>
          {/* Main user info tile layout*/}
          <div style={styles.userInfoContainer}>
            {error ? (
              <div>{error}</div>) : userInfo ? (
                <div style={styles.tile}>
                  <h2 style={styles.tileHeader}>{userInfo.username}</h2>
                  <p style={styles.tileText}>Status: {userInfo.status}</p>
                  <p style={styles.tileText}>Bio: {userInfo.bio}</p>
                </div>
              ) : (
              'Loading...'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  ...sharedStyles,
  profPageButton: {
    backgroundColor: '#fff',
    color: '#008fdc',
    border: 'none',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    width: '80px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    pointerEvent: 'auto',
  },
  userInfoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: '400px',
    paddingBottom: '350px'
  },
  tile: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    padding: '40px',
    width: '400px',
    maxWidth: '90%',
    textAlign: 'center',
    backgroundColor: '#fff',
    transform: 'scale(1.05)',
  },
  tileHeader: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  tileText: {
    fontSize: '1.2rem',
    margin: '10px 0',
  },
};

export default Profiles;