import {
  AnalyzeExpenseCommand,
} from '@aws-sdk/client-textract';
import { displayBlockInfo } from './display-block-info.js';

export const analyzePage = async function (photo) {
  // You just need to provide the bucket and document name of your s3 bucket and you will get the text back.
  const params = {
    Document: {
      S3Object: {
        Bucket: process.env.MY_BUCKET,
        Name: photo,
      },
    },
    FeatureTypes: ['TABLES', 'FORMS', 'SIGNATURES'],
  };

  //if it is an invoice, we can get the total amount to be paid.
  const command = new AnalyzeExpenseCommand(params);
  const totalResponse = await textractClient.send(command);

  await displayBlockInfo()
  const analyzedPage = await analyze_document_text()
  return analyzedPage
};

export const analyzePageSafe = async (photo) => {
  try {
    return await analyzePage(photo);
  } catch (err) {
    console.error(`Error processing ${photo}:`, err);
    return null; // or handle errors as appropriate
  }
};
