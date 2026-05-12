import {
  TextractClient,
  AnalyzeExpenseCommand,
  AnalyzeDocumentCommand,
} from '@aws-sdk/client-textract';
import { fromIni } from '@aws-sdk/credential-providers';
import 'dotenv/config';
import RawTextOutput from '../Models/raw-ocr-output-model.js';
import findFiles from '../Helpers/s3-find-files.js';
import { analyzePage, analyzePageSafe } from '../helpers/image analysis.js/image-analyzer.js';

//Takes bucket and photo into the request body and provides text from an image

//Region of textract client
const textractClient = new TextractClient({
  region: process.env.REGION_TEXTRACT,
  credentials: fromIni({ profile: process.env.PROFILE }),
});

const analyseDoc = async function (req, res, next) {
  let photo = req.body.photo;
  const Bucket = process.env.MY_BUCKET;
  let allDocuments = [];
  try {
    await analyzePage()

    //I only want to send the whole process to run, if there is a document with that name
    const allFilesInS3 = await findFiles();
    const allFilesInS3Array = allFilesInS3[0].split(',');

    const promises = [];

    //Aktuell begrenzt auf 15 Seiten
    // Loop through the files and add them to the promises array
    for (let i = 0; i < 16; i++) {
      let currentPhoto = `${photo}-${i}.jpg`;
      if (allFilesInS3Array.some((file) => file === currentPhoto)) {
        promises.push(analyzePageSafe(currentPhoto));
      }
    }

    // Wait for all promises to resolve
    const allDocuments = await Promise.all(promises);
    // Filter out null results and send the response
    res.status(201).send('Poper analysis done');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing documents');
  }
};

export default analyseDoc;
