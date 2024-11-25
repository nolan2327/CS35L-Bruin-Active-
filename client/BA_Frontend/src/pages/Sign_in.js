import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../components/HomeIcon';
import sharedStyles from '../styles/SharedStyles';
import Profiles from './Profile_Page';

const SignIn = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            {/* Home Icon */}
            <button
                style={styles.homeButton}
                onClick={() => navigate('/')} // Navigate to home page
            >
                <HomeIcon />
            </button>

            {/* Sign-In Form */}
            <div style={styles.tileStyle}>
                <h2 style={styles.titleStyle}>Sign In</h2>
                <input
                    type="text"
                    placeholder="Username"
                    style={styles.inputStyle}
                />
                <div style={{ margin: '10px 0' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.inputStyle}
                    />
                </div>
                <h4 style={styles.titleStyle}>New to Bruin Active?</h4>
                <button
                    style={styles.buttonStyle}
                    onClick={() => navigate('/')} //Will link to createprofile page when it is done
                >Create a Profile</button>
                <button
                    style={styles.SiButtonStyle}
                    onClick={() => navigate('/')} //Will link either to home or profile page
                >Sign In</button>
            </div>
        </div>
    );
};

const styles = {
    ...sharedStyles,
    container: {
        position: 'relative', // For positioning the home button
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0', // Optional: Add a background color
    },
    homeButton: {
        position: 'absolute',
        padding: '40px',
        width: '80px',
        height: '80px',
        color: '#008fdc',
        top: '20px',
        left: '20px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    tileStyle: {
        backgroundColor: '#008fdc',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '350px',
    },
    titleStyle: {
        marginBottom: '10px',
        color: '#fff',
    },
    inputStyle: {
        width: '300px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    buttonStyle: {
        width: '100px',
        padding: '10px',
        fontSize: '10px',
        marginBottom: '30px',
        color: '#008fdc',
        border: '1px solid #ccc',
        borderRadius: '2px',
    },
    SiButtonStyle: {
        width: '300px',
        padding: '10px',
        fontSize: '24px',
        backgroundColor: '#fff',
        color: '#008fdc',
        border: '1px solid #ccc',
        borderRadius: '2px',
    },
};

export default SignIn;
