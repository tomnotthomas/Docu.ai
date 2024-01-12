import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { fromIni } from '@aws-sdk/credential-providers';
import 'dotenv/config'
import RawTextOutput from '../Models/raw-ocr-output-model.js'

//Takes bucket and photo into the request body and provides text from an image

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
    let handwriting= false;

    response.Blocks.forEach(block => {
      // Filter for lines and words only
      if ( block.BlockType === 'WORD') {
        words.push(block.Text.toLowerCase());
      }
     if (block.TextType === 'HANDWRITING'){
      handwriting = true;
     }
    })
    console.log(words);
 

    const rawOutput = await RawTextOutput.create({
      filename: req.body.photo,
      text: JSON.stringify(words),
      //If the document includes an Iban and an Account owner, it is an Invoice
      invoice: (words.includes('kontoinhaber:') || words.includes('kontoinhaber') && words.includes('iban') || words.includes('iban:')),
      pod: handwriting ,
      //I will take the name of the document for now.
      order: (words.includes('bestellung') || words.includes('bestellung:') || words.includes('transportauftrag') || words.includes('transportauftrag:') || words.includes ('transportauftrag, ') || words.includes('transportauftrag,'))
    })
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