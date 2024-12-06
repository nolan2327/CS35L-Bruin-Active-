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
import UploadIcon from '../components/UploadIcon';
import { AuthContext } from '../utils/IsSignedIn';
import { findImage, findProfile } from '../utils/services';
import { bufferToBase64 } from '../utils/ImageConversion';


const Profiles = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { isLoggedIn, mainUser, SiSwitch } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [profPic, setProfPic] = useState(null);


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Get the user's profile information
        console.log(mainUser);
        const profile = await findProfile(mainUser);
        setUserInfo(profile);

        // Get the user's profile picture

      } catch (error) {
        console.log('Could not fetch image');
      }
    };

    getUserInfo();
  }, [mainUser]);

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
              navigate('/');
            } else {
              navigate('/sign_in');
            }
          }}
        >
          {profPic ? (
            <img
              src={profPic}
              alt="Profile"
              style={styles.profileImageCorner}
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
            <button style={sharedStyles.button} onClick={() => {
              navigate('/');
            }}>
              <HomeIcon />
            </button>
            <button style={sharedStyles.button} onClick={(e) => {
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

          <button style={styles.profPageButton} onClick={() => navigate('/upload_image')}>
            <UploadIcon />
          </button>
          {/* Main user info tile layout*/}
          <div style={styles.userInfoContainer}>
            {userInfo ? (
              <div style={styles.tile}>
                {profPic ? (
                  <img
                    src={profPic}
                    alt="Profile"
                    style={styles.profileImage}
                  />
                ) : (
                  <div style={styles.profileImagePlaceholder}>
                    {mainUser.charAt(0).toUpperCase()}
                  </div>
                )}
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
  profileImageCorner: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginTop: '75px',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  profileImagePlaceholder: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '20px',
  },
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