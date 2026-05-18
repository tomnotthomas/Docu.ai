
import 'dotenv/config';
import findFiles from '../Helpers/s3-find-files.js';
import { analyzePage, analyzePageSafe } from '../helpers/image_analysis/image-analyzer.js';

//Takes bucket and photo into the request body and provides text from an image


const analyseDoc = async function (req, res, next) {
  let photo = req.body.photo;
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
