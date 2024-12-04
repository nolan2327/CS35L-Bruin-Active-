import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../components/HomeIcon';
import sharedStyles from '../styles/SharedStyles';
import { uploadImage } from '../utils/services';
import { AuthContext } from '../utils/IsSignedIn';

const UploadImage = () => {
    const navigate = useNavigate();
    const { mainUser } = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setErrorMessage] = useState("");
    const [success, setSuccessMessage] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setSelectedImage(file);
        }
    };

    const handleUpload = async () => {
        try {
            if (!selectedImage) {
                setErrorMessage('Select an image.');
                return;
            }
            const UploadResponse = await uploadImage(mainUser, selectedImage);

            if (UploadResponse.error) {
                setErrorMessage(UploadResponse.message || 'Failed to upload image.');
                return;
            }
            setSuccessMessage('Uploaded Successfully!');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setErrorMessage('An unexpected error occurred.');
        }
    };

    return (
        <div style={styles.container}>
            <button
                style={styles.homeButton}
                onClick={() => navigate('/')}
            >
                <HomeIcon />
            </button>

            <div style={styles.tileStyle}>
                <h2 style={styles.titleStyle}>Upload Profile Picture</h2>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}
                
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={styles.fileInput}
                />
                
                {previewImage && (
                    <div style={styles.previewContainer}>
                        <h4 style={styles.titleStyle}>Preview</h4>
                        <img 
                            src={previewImage} 
                            alt="Preview" 
                            style={styles.previewImage} 
                        />
                    </div>
                )}

                <button
                    style={styles.uploadButton}
                    onClick={handleUpload}
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

const styles = {
    ...sharedStyles,
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
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
    fileInput: {
        width: '300px',
        padding: '10px',
        marginBottom: '20px',
        color: '#fff',
    },
    previewContainer: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    previewImage: {
        maxWidth: '250px',
        maxHeight: '250px',
        borderRadius: '5px',
        border: '2px solid #fff',
    },
    uploadButton: {
        width: '300px',
        padding: '10px',
        fontSize: '24px',
        backgroundColor: '#fff',
        color: '#008fdc',
        border: '1px solid #ccc',
        borderRadius: '2px',
        cursor: 'pointer',
    },
    error: {
        color: '#ff3333',
        marginBottom: '10px',
    },
    success: {
        color: '#4CAF50',
        marginBottom: '10px',
    }
};

export default UploadImage;