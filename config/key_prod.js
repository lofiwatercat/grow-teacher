module.exports = {
    secretOrKey: process.env.SECRET_OR_KEY,
    mongoURI: process.env.MONGO_URI,
    isProduction: process.env.NODE_ENV === 'production',
    
    s3AccessKey: process.env.S3_ACCESS_KEY,
    s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    s3Bucketregion: process.env.S3_BUCKET_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
    uploadedUrl: process.env.AWS_Uploaded_File_URL_LI,
    
}
