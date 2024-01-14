import {
  S3Client,
  // This command supersedes the ListObjectsCommand and is the recommended way to list objects.
  ListObjectsV2Command,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import 'dotenv/config'
import { fromIni } from '@aws-sdk/credential-providers';


//REGION is the region of your AWS account, credentials profile is your profile name
const client = new S3Client({
  region: process.env.REGION,
  credentials: fromIni({ profile: process.env.PROFILE }),
});


//Get all the documents from the specified S3 bucket.
const findFiles = async function () {
  const command = new ListObjectsV2Command({
    Bucket: process.env.MY_BUCKET,
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 10,
  });

  try {
    let isTruncated = true;

    let contents = [];

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      const contentsList = Contents.map((c) => `${c.Key}`).join(",");
      contents.push (contentsList);
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    return contents;
    
  } catch (err) {
    console.error(err);
  }
};

export default findFiles;