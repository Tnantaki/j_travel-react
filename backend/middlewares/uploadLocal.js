const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// where on disk to save the file
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: (req, file, cb) => {
		// generate a secure filename to prevent path traversal attacks
		// get file extention
		const fileExt = path.extname(file.originalname).toLowerCase();

		// what name to give the saved file
		const randomName = `${crypto.randomBytes(16).toString('hex')}${fileExt}`;
		cb(null, randomName);
	}
});
const fileFilter =(req, file, cb) => {
	if (!file.mimetype.startsWith('image/'))
		return cb(new Error('Only images allowed'), false);
	
	const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
	const fileExt = path.extname(file.originalname).toLowerCase();
	
	if (!validExtensions.includes(fileExt)) 
		return cb(new Error('Invalid file extention'), false);

	cb(null, true);
}

const uploadLocal = multer({
	storage,
	limits: {fileSize: 5 * 1024 * 1024}, //5MB
	fileFilter
});

module.exports = uploadLocal;