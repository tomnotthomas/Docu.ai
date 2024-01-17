Create an AWS account
If you’re using VSCode, you can connect to AWS with a plugin called AWS Toolkit named: AWS Toolkit - Amazon Q, CodeWhisperer, and more

Enable Textract:
Follow the documentation:
https://docs.aws.amazon.com/textract/latest/dg/getting-started.html
       3.Create an S3 bucket:
Follow the documentation:
https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html
Go to the Server directory and install all dependencies
Create an .env file with the following:
REGION = Insert the region of your AWS account here
PROFILE = Insert your profile name here
MY_BUCKET = insert the name of your S3 bucket here
Go to the Client directory and install all dependencies
Create an .env file with the following:
MY_BUCKET = insert the name of your S3 bucket here
