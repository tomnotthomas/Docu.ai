import {
  S3Client,
  // This command supersedes the ListObjectsCommand and is the recommended way to list objects.
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import 'dotenv/config'
import { fromIni } from '@aws-sdk/credential-providers';

const client = new S3Client({
  region: process.env.REGION,
  credentials: fromIni({ profile: process.env.PROFILE }),
});

export const main = async () => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.MY_BUCKET,
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 1,
  });

  try {
    let isTruncated = true;

    console.log("Your bucket contains the following objects:\n");
    let contents = "";

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);
  } catch (err) {
    console.error(err);
  }
};

main();