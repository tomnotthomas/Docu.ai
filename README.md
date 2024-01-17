
# README

1. Create an AWS account. You can find some information about it here:https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-creating.html
2. If you’re using VSCode, you can connect to AWS with a plugin called AWS Toolkit named: AWS Toolkit - Amazon Q, CodeWhisperer, and more

3. Enable Textract:
Follow the documentation:
https://docs.aws.amazon.com/textract/latest/dg/getting-started.html
 4. Create an S3 bucket:
Follow the documentation:
  https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html
5. Go to the Server directory and install all dependencies
6. Create an .env file with the following:
  REGION =  Insert the region of your AWS account here
  PROFILE = Insert your profile name here
  MY_BUCKET = insert the name of your S3 bucket here
7. Go to the client directory and install all dependencies
8. In the client, Create an .env file with the following:
    MY_BUCKET = insert the name of your S3 bucket here
