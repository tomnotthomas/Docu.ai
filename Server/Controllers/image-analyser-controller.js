import { TextractClient, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { fromIni } from '@aws-sdk/credential-providers';
import 'dotenv/config'

const textractClient = new TextractClient({
  region: process.env.REGION,
  credentials: fromIni({ profile: process.env.PROFILE }),
});

const analyseDoc = async function (req, res, next) {
 

// Set params
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
    let words = []
    response.Blocks.forEach(block => {
      // Filter for lines and words only
      if (block.BlockType === 'LINE' || block.BlockType === 'WORD') {
        words.push(block.Text);
      }
     
    })
    console.log(words)
    res.status(201).send(words);
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