import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { fromIni } from '@aws-sdk/credential-providers';
import 'dotenv/config'
import RawTextOutput from '../Models/raw-ocr-output-model.js'

//Takes bucket and photo into the request body

//REGION is the region of your AWS account, credentials profile is your profile name
const textractClient = new TextractClient({
  region: process.env.REGION,
  credentials: fromIni({ profile: process.env.PROFILE }),
});

const analyseDoc = async function (req, res, next) {


// You just need to provide the bucket and document name of your s3 bucket and you will get the text back.
const params = {
  Document: {
    S3Object: {
      Bucket: req.body.bucket,
      Name: req.body.photo
    },
  },
  FeatureTypes: ['TABLES', 'FORMS'],
};

const displayBlockInfo = async (response) => {
  try {
    let words = [];
    response.Blocks.forEach(block => {
      // Filter for lines and words only
      if (block.BlockType === 'LINE' ) {
        words.push(block.Text);
      }
     
    })
    console.log(words)
    const rawOutput = await RawTextOutput.create({filename: req.body.photo, text: JSON.stringify(words)})
    res.status(201).send(rawOutput);
  } catch (err) {
    console.log("Error", err);
  }
};

const analyze_document_text = async () => {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);
    displayBlockInfo(response);
  } catch (err) {
    console.log("Error", err);
  }
};
analyze_document_text()
}
export default analyseDoc;