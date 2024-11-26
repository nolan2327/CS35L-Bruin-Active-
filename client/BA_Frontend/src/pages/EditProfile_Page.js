import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../components/HomeIcon';
import sharedStyles from '../styles/SharedStyles';
import { changeBio, changeStatus } from '../utils/services';

const EditProfile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    const [bio, setBio] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleEdit = async () => {
        try {
            // Register the user
            const changeStatusResponse = await changeStatus(username, status);
            if (changeStatusResponse.error) {
                setErrorMessage(changeStatusResponse.message || 'Failed to change your status.');
                return;
            }

            // Create the profile
            const changeBioResponse = await changeBio(username, bio);
            if (changeBioResponse.error) {
                setErrorMessage(changeBioResponse.message || 'Failed to create profile.');
                return;
            }

            // If successful, redirect to the sign-in page
            setSuccessMessage('Account successfully changed!!');
            setTimeout(() => navigate('/Profile_Page'), 2000); // Redirect after 2 seconds
        } catch (error) {
            setErrorMessage('An unexpected error occurred.');
        }
    };

    return (
        <div style={styles.container}>
            {/* Home Icon */}
            <button
                style={styles.homeButton}
                onClick={() => navigate('/')} // Navigate to home page
            >
                <HomeIcon />
            </button>

            {/* Sign-Up Form */}
            <div style={styles.tileStyle}>
                <h2 style={styles.titleStyle}>Edit Profile</h2>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                {successMessage && <p style={styles.success}>{successMessage}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.inputStyle}
                />
                <input
                    type="text"
                    placeholder="New Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={styles.inputStyle}
                />
                <textarea
                    placeholder="New Biography"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    style={styles.textAreaStyle}
                />
                <button style={styles.SiButtonStyle} onClick={handleEdit}>
                    Change Profile
                </button>
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
        marginBottom: '10px',
    },
    textAreaStyle: {
        width: '300px',
        height: '80px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '10px',
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
    error: {
        color: 'red',
        marginBottom: '10px',
    },
    success: {
        color: 'green',
        marginBottom: '10px',
    },
};

export default EditProfile;

