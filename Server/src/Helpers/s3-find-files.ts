import {
  S3Client,
  S3ClientConfig,
  // This command supersedes the ListObjectsCommand and is the recommended way to list objects.
  ListObjectsV2Command,
  
} from "@aws-sdk/client-s3";
import 'dotenv/config'
import { fromIni } from '@aws-sdk/credential-providers';

//REGION is the region of your AWS account, credentials profile is your profile name
const credentials : { profile : string} ={ profile : process.env.PROFILE || 'default'};
const region : string = process.env.REGION || 'default'

const s3Config : S3ClientConfig = {
  region,
  credentials: fromIni(credentials),
}

const client  : S3Client = new S3Client(s3Config);


//Get all the documents from the specified S3 bucket.
const findFiles : () => Promise<string[] | undefined> = async function () {
  const command = new ListObjectsV2Command({
    Bucket: process.env.MY_BUCKET,
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 1000,
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