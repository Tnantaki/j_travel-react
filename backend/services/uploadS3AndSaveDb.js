const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { validateImageFile, generateUniqeFileName } = require('./imageUploadService');

// init connection to aws s3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY
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

module.exports = uploadImageToS3