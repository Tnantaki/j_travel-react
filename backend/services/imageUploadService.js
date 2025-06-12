const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const crypto = require('crypto');

// init connection to aws s3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY
    }
});

// define image types that will be accepted
const ALLOW_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

async function validateImageFile(file) {
    const fileBuffer = file.buffer || file;

    if (fileBuffer.length > MAX_FILE_SIZE)
        throw new Error(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);

    const { fileTypeFromBuffer } = await import('file-type');

    // Verify the actual file type by reading the file's magic bytes
    // This prevents someone from renaming a virus.exe to virus.jpg
    const fileType = await fileTypeFromBuffer(fileBuffer);

    if (!fileType || !ALLOW_IMAGE_TYPES.includes(fileType.mime))
        throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.');

    return fileType;
}

function generateUniqeFileName(originalName, fileType) {
    const timestap = Date.now();
    const randomBytes = crypto.randomBytes(6).toString('hex');

    // extract the original name w/o extention for cleanliness
    const noExtName = originalName.split('.')[0].slice(0, 20); //limit length
    const safeFileName = noExtName.replace(/[^a-zA-Z0-9]/g, '_'); // remove special chars

    return `${safeFileName}_${timestap}_${randomBytes}.${fileType.ext}`;
}

async function uploadImageToS3(fileBuffer, originalName) {
    try {
        // validate the file
        const fileType = await validateImageFile(fileBuffer, originalName);

        // generate unique filename
        const fileName = generateUniqeFileName(originalName, fileType);

        // prepare the upload to s3
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `images/${fileName}`,  // store in an 'uploads' folder for organization
            Body: fileBuffer,
            ContentType: fileType.mime,
            // add some useful metadata
            Metadata: {
                'original-name': originalName,
                'upload-date': new Date().toISOString()
            }
        };

        // upload the file
        const upload = new Upload({
            client: s3Client,
            params: uploadParams
        });

        // wait for the upload to complete
        const res = await upload.done();

        // return the public url where the image can be accessed
        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/images/${fileName}`;

        return {
            success: true,
            imageUrl: imageUrl,
            fileName: fileName,
            originalName: originalName,
            fileSize: fileBuffer.length,
            mimeType: fileType.mime
        };

    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

module.exports = {
    uploadImageToS3,
    validateImageFile,
    generateUniqeFileName,
    ALLOW_IMAGE_TYPES,
    MAX_FILE_SIZE
}