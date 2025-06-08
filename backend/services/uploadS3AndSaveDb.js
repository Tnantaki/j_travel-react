const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const Image = require('../models/image');
const { fileTypeFromBuffer } = require('file-type');
const { validateImageFile, generateUniqeFileName } = require('./imageUploadService');

// init connection to aws s3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY
    }
});

async function uploadImageToS3(file) {
    try {
        // console.log(file);
        const fileBuffer = file.buffer;
        const originalName = file.originalname;

        const fileType = await validateImageFile(fileBuffer, originalName);
        const fileName = generateUniqeFileName(originalName, fileType);

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `images/${fileName}`,  // store in an 'uploads' folder for organization
            Body: fileBuffer,
            ContentType: fileType.mime,
            Metadata: {
                'original-name': originalName,
                'upload-date': new Date().toISOString()
            }
        };

        const upload = new Upload({
            client: s3Client,
            params: uploadParams
        });

        // const uploadRes = await upload.done();
        const uploadRes = await upload.done()

        // const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/images/${fileName}`;

        return {
            imageUrl: uploadRes.Location,
            originalName: file.originalname,
            Key: uploadRes.Key,
            size: file.size,
            mimeType: fileType.mime,
        }
        // return {
        //     imageUrl,
        //     originalName,
        //     fileName,
        //     fileSize: fileBuffer.length,
        //     mimeType: fileType.mime,
        //     s3Key: uploadParams.Key,
        //     s3Response: uploadRes
        // }
        // const savedImage = await imageDoc.save();
        // return savedImage;

    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

module.exports = uploadImageToS3