module.exports = {
    secretOrKey: process.env.SECRET_OR_KEY,
    mongoURI: process.env.MONGO_URI,
    isProduction: process.env.NODE_ENV === 'production'
};


/*
S3_ACCESS_KEY: AKIAZM7IALKZR4YGCZ6N
S3_SECRET_ACESS_KEY: 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
S3_BUCKET_REGION: us-west-1
*/