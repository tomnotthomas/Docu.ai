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
    if (!req.files || !req.files.file) {
      return res.status(400).send("File not received");
    }

    const files = Array.isArray(req.files.file) ? req.files.file : [req.files.file];
    let filesToUpload = [];

    for (const file of files) {
      const fileName = file.originalFilename;
      const fileExtension = path.extname(fileName).toLowerCase();

      if (fileExtension === '.pdf') {
        const conversion_config = {
          scale: 2.0
        };
    
        // Convert PDF to images (JPG)
        const convertedFiles = await pdf2img.convert(file.path, conversion_config);
        filesToUpload.push(...convertedFiles.map((buffer, index) => {
          const newFileName = `${path.basename(fileName, fileExtension)}-${index}.jpg`;
          fs.writeFileSync(newFileName, buffer);
          return {
            path: newFileName,
            originalFilename: newFileName
          };
        }));
      } else {
        filesToUpload.push(file);
      }
    }

    // Upload files to S3 and add file names to the array
    for (const uploadFile of filesToUpload) {
      const fileData = fs.readFileSync(uploadFile.path);
  
      const uploadParams = {
        Bucket: process.env.MY_BUCKET,
        Key: uploadFile.originalFilename,
        Body: fileData,
      };
      // Delete the temp file
      await s3Client.send(new PutObjectCommand(uploadParams));
      fs.unlinkSync(uploadFile.path); 
    }

    console.log("Successfully uploaded data");
    // Send the original file name as response
   
    res.status(200).json({ fileName: files[0].originalFileName }); 
    } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err.message);
    }
    };
    
    export default upload;

