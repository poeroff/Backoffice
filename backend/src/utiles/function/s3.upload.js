import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { v4 } from 'uuid';

dotenv.config();

const s3 = new AWS.S3({
    region: process.env.REGION_KEY,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

/**
 * s3에 이미지 업로드
 * @param {object} fileObj
 * @returns {object} result
 */
export const s3upload = async fileObj => {
    
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: v4(),
        Body: fileObj.buffer,
        ContentType: fileObj.mimetype,
        ALC: 'public-read',
    };

    const result = await s3.upload(params).promise();

    return result;
};
