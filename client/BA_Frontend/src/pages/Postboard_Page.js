import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import sharedStyles from '../styles/SharedStyles';
import { getUsers } from '../utils/services.js'; // Assuming getUsers function is in utils
import { findProfile, findImage } from '../utils/services.js'; // Assuming findProfile function is in utils
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';
import { AuthContext } from '../utils/IsSignedIn.js';
import { bufferToBase64 } from '../utils/ImageConversion.js';

const ProfileIconNew = () => {
  return (
    <span style={styles.profileIcon} className="material-symbols-outlined icon-hover">
      person
    </span>
  );
};

const Board = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]); // State to store user profiles
  const [userImages, setUserImages] = useState({}); // State to store user images
  const [error, setError] = useState(null);
  const [profPic, setProfPic] = useState(null);
  const { isLoggedIn, mainUser } = useContext(AuthContext);

  const fetchUserImages = async (userProfiles) => {
    const imageMap = {};
    for (let user of userProfiles) {
      try {
        const image = await findImage(user.username);
        if (image && image !== "error findImage try function failed" && image[0]?.data?.data) {
          const base64string = bufferToBase64(image[0].data.data);
          imageMap[user.username] = `data:${image.mimetype};base64,${base64string}`;
        }
      } catch (err) {
        console.log(`Error fetching image for ${user.username}:`, err);
      }
    }
    setUserImages(imageMap);
  };

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
      fetchUserImages(profiles); // Add this line to fetch images after profiles
    };

    if (users.length > 0) {
      fetchProfiles();
    }
  }, [users]);

  useEffect(() => {
    const getProfPic = async () => {
      try {
        if (isLoggedIn) {
          // Getting the profile picture of the user
          const image = await findImage(mainUser);
          // If there is one then we set the value of profPic
          if (image != "error findImage try function failed") {
            const base64string = bufferToBase64(image[0].data.data);
            setProfPic(`data:${image.mimetype};base64,${base64string}`);
          }
        }
      } catch (error) {
        console.log('No Image');
      }
    };
    getProfPic();
  }, []);

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

        <div style={styles.postboardContainer}>
          <div style={styles.userList}>
            {error ? (
              <div>{error}</div>
            ) : userProfiles.length > 0 ? (
              userProfiles.map((user, index) => (
                <div key={index} style={styles.userItem}>
                  <div style={styles.userContent}>
                    <div style={styles.username}>Username: {user.username}</div>
                    <div style={styles.status}>Status: {user.status}</div>
                    <div style={styles.bio}>Bio: {user.bio}</div>
                  </div>
                  <div style={styles.imageContainer}>
                    {userImages[user.username] ? (
                      <img
                        src={userImages[user.username]}
                        alt={`${user.username}'s profile`}
                        style={styles.userProfileImage}
                      />
                    ) : (
                      <div style={styles.placeholderImage}>
                        <ProfileIconNew />
                      </div>
                    )}
                  </div>
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
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginTop: '75px',
  },
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
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  userContent: {
    flex: 1,
  },
  imageContainer: {
    marginLeft: '15px',
  },
  userProfileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  placeholderImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default Board;