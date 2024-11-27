import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../components/HomeIcon';
import sharedStyles from '../styles/SharedStyles';
import { loginUser } from '../utils/services';
import { AuthContext } from '../utils/IsSignedIn';
// TODO: Do we want the error response to remain after sign in is pressed again
// TODO: We need a way to keep user logged in, the login itself is working with backend, but need a way to keep user logged in
const SignIn = () => {
    const navigate = useNavigate();
    const { isLoggedIn, SiSwitch } = useContext(AuthContext);
    const [userName, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [error, setErrorMessage] = useState("");
    const [success, setSuccessMessage] = useState("");


    const handleSignIn = async () => {
        try {
            // Login the user
            const loginResponse = await loginUser(userName, password);


            if (loginResponse.error) {
                setErrorMessage(loginResponse.message || 'Failed to login user.');
                return;
            }


            setSuccessMessage('Logged in successfully!');
            SiSwitch();
            setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
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


            {/* Sign-In Form */}
            <div style={styles.tileStyle}>
                <h2 style={styles.titleStyle}>Sign In</h2>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}
                <input
                    type="text"
                    value={userName}
                    placeholder="Username"
                    onChange={(e) => setusername(e.target.value)}
                    style={styles.inputStyle}
                />
                <div style={{ margin: '10px 0' }}>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setpassword(e.target.value)}
                        style={styles.inputStyle}
                    />
                </div>
                <h4 style={styles.titleStyle}>New to Bruin Active?</h4>
                <button
                    style={styles.buttonStyle}
                    onClick={() => navigate('/sign_up')}
                >
                    Create a Profile
                </button>
                <button
                    style={styles.SiButtonStyle}
                    onClick={handleSignIn}
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
        color: '#008fdc', // HERE
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
    error: {
        color: 'red',
        marginBottom: '10px',
    },
    success: {
        color: 'green',
        marginBottom: '10px',
    },
};


export default SignIn;
