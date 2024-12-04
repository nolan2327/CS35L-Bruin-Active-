const multer = require('multer');
const imageModel = require('../Models/imageModel');

// Configure Multer for file storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG and PNG files are allowed.'));
        }
    }
}).single('image');

// Controller to upload an image
const uploadImage = async (req, res) => {
    try {
        

        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (!req.file) {
                console.log('Its the file');
                return res.status(400).json({ error: 'No file uploaded.' });
            }

            const { username } = req.body;
            if (!username) {
                console.log('Its the username');
                return res.status(400).json({ error: 'Username is required.' });
            }

            try {
                const { mimetype, size, buffer } = req.file;
                const image = new imageModel({ username, mimetype, size, data: buffer });
                if(imageModel.find({username})) {
                    imageModel.findOneAndRemove({username});
                }
                await image.save();
                res.status(200).json({ message: 'Image uploaded successfully.', image });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to save image to the database.' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to save image' });;
    }
};

// Controller to find images by username
const findImage = async (req, res) => {
    const { username } = req.body;

    try {
        const image = await imageModel.find({ username });
        if (image.length === 0) {
            return res.status(404).json({ message: 'No images found for this username.' });
        }
        res.status(200).json(image);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving images.' });
    }
};

module.exports = { uploadImage, findImage };