const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { ALLOW_IMAGE_TYPES, 
        MAX_FILE_SIZE, 
        validateImageFile, 
        generateUniqeFileName} = require('../services/imageUploadService');
const { validateImage } = require('../models/image');

// init connection to aws s3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY
    }
});

const upload = multer({
	storage: multer.memoryStorage(),
	limit: { fileSize: MAX_FILE_SIZE},
	fileFilter(req, file, cb) { 
		if (!ALLOW_IMAGE_TYPES.includes(file.mimetype))
			return cb(new Error('Only JPEG, PNG, WebP or GIF images allowed'))
		cb(null, true);
	}
});

async function uploadImageToS3({buffer, originalname, fileName, mimeType}) {
    try {
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `images/${fileName}`,  // store in an 'uploads' folder for organization
            Body: buffer,
            ContentType: mimeType,
            Metadata: {
                'original-name': originalname,
                'upload-date': new Date().toISOString()
            }
        };

        const upload = new Upload({
            client: s3Client,
            params: uploadParams
        });

        const uploadRes = await upload.done()

        return {
            imageUrl: uploadRes.Location,
            originalName: originalname,
            Key: uploadRes.Key,
            size: buffer.length,
            mimeType: mimeType
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

async function initImage(imageFiles, req) {
	const captions = Array.isArray(req.body.caption) ? req.body.caption : [];
	const tags = Array.isArray(req.body.tag) ? req.body.tag : [];

	const imgInfos = [];
	for (let i = 0; i < imageFiles.length; i++) {
		// validate file and generate name
		const file = imageFiles[i];
		const fileType = await validateImageFile(file.buffer);
		const fileName = generateUniqeFileName(file.originalname, fileType);

		const payload = {
			originalName: file.originalname,
			fileName: fileName,
			fileSize: file.buffer.length,
			mimeType: fileType.mime,
			caption: captions[i],
			tag: tags[i]
				? tags[i].split(',').map(t => t.trim().toLowerCase())
				: [],
			isActive: true,
			uploadedBy: req.user._id
		}

		const {error} = validateImage(payload);
		if (error)
			throw new Error(`Validation failed for "${payload.originalName}": ${error.details[0].message}`);
		
		imgInfos.push({file, fileType, fileName, payload});
	}

	return imgInfos;
}

async function uploadImage(imgInfos) {
	// upload image to aws
	const uploadRes = [];
	for (const {file, fileType, fileName} of imgInfos) {
		const res = await uploadImageToS3({
			buffer: file.buffer,
			originalname: file.originalname,
			fileName,
			mimeType: fileType.mime
		})
		uploadRes.push(res);
	}	

	return uploadRes;
}

module.exports = {
    upload,
    uploadImageToS3,
    initImage,
    uploadImage,
    s3Client
}