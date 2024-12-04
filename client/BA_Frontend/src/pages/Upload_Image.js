import React, { useState, useContext } from 'react';
import { uploadImage } from '../utils/services';
import { useNavigate } from 'react-router-dom';
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
        console.log(file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file)); // Preview the image
            setSelectedImage(file);
        }
    };

    const handleUpload = async () => {
        try {
            if (!selectedImage) {
                setErrorMessage('Select an image.')
                return;
            }
            const UploadResponse = await uploadImage(mainUser, selectedImage);

            if (UploadResponse.error) {
                setErrorMessage(UploadResponse.message || 'Failed to login user.');
                return;
            }
            // Add upload logic here
            setSuccessMessage('Uploaded Successfully!');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setErrorMessage('An unexpected error occurred.');
        }
    };

    return (
        <div>
            <h2>Upload an Image</h2>
            {error && <p>{error.message}</p>}
            {success && <p>{success.message}</p>}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && (
                <div>
                    <h3>Preview:</h3>
                    <img src={previewImage} alt="Preview" style={{ maxWidth: '300px' }} />
                </div>
            )}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default UploadImage;