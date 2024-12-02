import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import sharedStyles from '../styles/SharedStyles';
import { getUsers } from '../utils/services.js'; // Assuming getUsers function is in utils
import { findProfile } from '../utils/services.js'; // Assuming findProfile function is in utils
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';
import { AuthContext } from '../utils/IsSignedIn.js';

const Board = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userProfiles, setUserProfiles] = useState([]); // State to store user profiles
    const [error, setError] = useState(null);
    const { isLoggedIn } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await getUsers();
          setUsers(response); // Set all users
        } catch (err) {
          setError('Error fetching users');
        }
      };
  
      fetchUsers();
    }, []);
  
    // Fetch profile for each user
    useEffect(() => {
      const fetchProfiles = async () => {
        const profiles = [];
        for (let user of users) {
          try {
            const profile = await findProfile(user.username);
            profiles.push({ ...user, status: profile.status, bio: profile.bio });
          } catch (err) {
            console.log(`Error fetching profile for ${user.username}:`, err);
          }
        }
        setUserProfiles(profiles);
      };
  
      if (users.length > 0) {
        fetchProfiles(); // Fetch profiles once users are loaded
      }
    }, [users]);
  
    return (
      <div style={sharedStyles.container}>
        <div style={sharedStyles.header}>
          <h2 style={sharedStyles.headerText}>Bruin Active</h2>
          <button
            style={sharedStyles.profileButton}
            onClick={() => {
              if (isLoggedIn === true) {
                navigate('/profile_page');
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
              <button style={sharedStyles.button} onClick={() => navigate('/')}>
                <HomeIcon />
              </button>
              <button style={sharedStyles.button} onClick={() => navigate('/calendar_page')}>
                <CalendarIcon />
              </button>
              <button style={sharedStyles.button} onClick={() => navigate('/postboard_page')}>
                <DashboardIcon />
              </button>
            </div>
          </div>
  
          {/* Postboard Section */}
          <div style={styles.postboardContainer}>
            <div style={styles.userList}>
              {error ? (
                <div>{error}</div>
              ) : userProfiles.length > 0 ? (
                userProfiles.map((user, index) => (
                  <div key={index} style={styles.userItem}>
                    <div style={styles.username}>Username: {user.username}</div>
                    <div style={styles.status}>Status: {user.status}</div>
                    <div style={styles.bio}>Bio: {user.bio}</div>
                  </div>
                ))
              ) : (
                <div>Loading user profiles...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const styles = {
    postboardContainer: {
      flex: 1, // This ensures it takes up remaining space in mainContent
      padding: '20px',
      overflowY: 'auto', // Enable vertical scrolling for the profiles section
      backgroundColor: 'transparent', // Make background transparent to avoid white box
      boxSizing: 'border-box', // Ensures padding doesn't cause overflow
    },
    postboardTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    userList: {
      display: 'flex',
      flexDirection: 'column', // Stack users vertically
      paddingBottom: '10px',
    },
    userItem: {
      marginBottom: '15px', // Space between each user
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#f0f0f0',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    username: {
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '5px',
    },
    status: {
      fontSize: '14px',
      color: '#555',
    },
    bio: {
      fontSize: '14px',
      color: '#555',
      marginTop: '5px',
    },
  };
  
  export default Board;  