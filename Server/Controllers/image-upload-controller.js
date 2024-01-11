import {
  S3Client,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import 'dotenv/config';
import { fromIni } from '@aws-sdk/credential-providers';
import fs from 'fs';
import pdf2img from 'pdf-img-convert';
import path from 'path';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: fromIni({ profile: process.env.PROFILE })
});

// Upload function
const upload = async function (req, res) {
  try {
    const file = req.files.file;
    const fileName = file.originalFilename;
    const fileExtension = path.extname(fileName).toLowerCase();

    let filesToUpload = [];

    if (fileExtension === '.pdf') {
        const conversion_config = {
          scale: 2.0
        }
      // Convert PDF to images (JPG)
      
      const convertedFiles = await pdf2img.convert(file.path, conversion_config);
      filesToUpload = convertedFiles.map((buffer, index) => {
        const newFileName = `${path.basename(fileName, fileExtension)}-${index}.jpg`;
        fs.writeFileSync(newFileName, buffer);
        return {
          path: newFileName,
          originalFilename: newFileName
        };
      });
    } else {
      filesToUpload.push(file);
    }

    // Upload files to S3
    for (const file of filesToUpload) {
      const fileData = fs.readFileSync(file.path);

      const uploadParams = {
        Bucket: process.env.MY_BUCKET,
        Key: file.originalFilename,
        Body: fileData,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));
      fs.unlinkSync(file.path); // Delete the temp file
    }

    console.log("Successfully uploaded data");
    res.status(200).end();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err);
  }
};

export default upload;
