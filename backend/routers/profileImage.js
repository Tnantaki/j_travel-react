const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Profile } = require('../models/profile');
const auth = require('../middlewares/auth');
const { uploadImageToS3, ALLOW_IMAGE_TYPES, MAX_FILE_SIZE} = require('../services/imageUploadService');

const upload = multer({
    storage: multer.memoryStorage(),
    limit: { fileSize: MAX_FILE_SIZE},
    fileFilter(req, file, cb) { 
        if (!ALLOW_IMAGE_TYPES.includes(file.mimetype))
            return cb(new Error('Only JPEG, PNG, WebP or GIF images allowed'))
        cb(null, true);
    }
});

router.post('/upload-profile-image', 
    upload.single('profileImage'),
    auth, async(req, res) => {
        if (!req.file)
            return res.status(400).send('No file was provided.');

        // call service to send the buffer to s3
        const {buffer, originalname} = req.file;
        const uploadRes = await uploadImageToS3(buffer, originalname);

        const updated = await Profile.findOneAndUpdate(
            {user: req.user._id},
            {profileImage: uploadRes.imageUrl},
            {new: true, runValidators: true}
        );

        if (!updated)
            return res.status(404).send('Profile for this user not found.');

        return res.send({
            message: 'Profile image uploaded successfully.',
            profileImageUrl: updated.profileImage
        })
    }
)

module.exports = router;
