require("dotenv").config(); // Loading dotenv to have access to env variables
const AWS = require("aws-sdk"); // Requiring AWS SDK.

// Configuring AWS
AWS.config = new AWS.Config({
	accessKeyId: `AKIAQLNXACVPPZ75ID6C`, // stored in the .env file
	secretAccessKey: `Ufkq58gawysLFh4aw2/ocIF8v9mniMdeasnSPugx`, // stored in the .env file
	region: `ap-south-1` // This refers to your bucket configuration.
});

// Creating a S3 instance
const s3 = new AWS.S3();

// Retrieving the bucket name from env variable
const Bucket = "tigrow-test-tigrow";

// In order to create pre-signed GET adn PUT URLs we use the AWS SDK s3.getSignedUrl method.
// getSignedUrl(operation, params, callback) ⇒ String
// For more information check the AWS documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

// GET URL Generator
function generateGetUrl(Key) {
	return new Promise((resolve, reject) => {
		const params = {
			Bucket: "tigrow-test-tigrow",
			Key,
			Body: buffer,
			Expires: 1200,
			ACL: "public-read"
		};
		// Note operation in this case is getObject
		s3.getSignedUrl("getObject", params, (err, url) => {
			if (err) {
				reject(err);
			} else {
				// If there is no errors we will send back the pre-signed GET URL
				resolve(url);
			}
		});
	});
}

// PUT URL Generator
function generatePutUrl(Key, ContentType) {
	return new Promise((resolve, reject) => {
		// Note Bucket is retrieved from the env variable above.
		const params = { Bucket, Key, ContentType };
		// Note operation in this case is putObject
		s3.getSignedUrl("putObject", params, function(err, url) {
			if (err) {
				reject(err);
			}
			// If there is no errors we can send back the pre-signed PUT URL
			resolve(url);
		});
	});
}

// Finally, we export the methods so we can use it in our main application.
module.exports = { generateGetUrl, generatePutUrl };
