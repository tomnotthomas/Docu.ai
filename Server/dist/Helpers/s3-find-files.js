var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { S3Client, 
// This command supersedes the ListObjectsCommand and is the recommended way to list objects.
ListObjectsV2Command } from "@aws-sdk/client-s3";
import 'dotenv/config';
import { fromIni } from '@aws-sdk/credential-providers';
//REGION is the region of your AWS account, credentials profile is your profile name
const client = new S3Client({
    region: process.env.REGION,
    credentials: fromIni({ profile: process.env.PROFILE }),
});
//Get all the documents from the specified S3 bucket.
const findFiles = function () {
    return __awaiter(this, void 0, void 0, function* () {
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
                const { Contents, IsTruncated, NextContinuationToken } = yield client.send(command);
                const contentsList = Contents.map((c) => `${c.Key}`).join(",");
                contents.push(contentsList);
                isTruncated = IsTruncated;
                command.input.ContinuationToken = NextContinuationToken;
            }
            return contents;
        }
        catch (err) {
            console.error(err);
        }
    });
};
export default findFiles;
