import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { fromIni } from '@aws-sdk/credential-providers';
import 'dotenv/config'

const textractClient = new TextractClient({
  region: process.env.REGION,
  credentials: fromIni({ profile: process.env.PROFILE }),
});
//Der bucket, in dem die Dokumente abgelegt werden.
const bucket = 'documentsforgermany';
//TODO die fotos werden im call angegeben.
const photo = 'POD_240001905_24000772_page-0001-transformed.jpeg';

// Set params
const params = {
  Document: {
    S3Object: {
      Bucket: bucket,
      Name: photo
    },
  },
  FeatureTypes: ['TABLES', 'FORMS'],
};

const displayBlockInfo = async (response) => {
  try {
    response.Blocks.forEach(block => {
      // Filter for lines and words only
      if (block.BlockType === 'LINE' || block.BlockType === 'WORD') {
        console.log(`${block.Text}`);
      }
    });
  } catch (err) {
    console.log("Error", err);
  }
};

const analyze_document_text = async () => {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);
    displayBlockInfo(response);
    return response; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

analyze_document_text();