import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { TextractClient } from "@aws-sdk/client-textract";

//Region of textract client
const textractClient = new TextractClient({
  region: process.env.REGION_TEXTRACT,
  credentials: fromIni({ profile: process.env.PROFILE }),
});

export const analyze_document_text = async () => {
    try {
      const analyzeDoc = new AnalyzeDocumentCommand(params);
      const response = await textractClient.send(analyzeDoc);
      const entireOutput = await displayBlockInfo(response);
      return entireOutput;
    } catch (err) {
      console.log('Error', err);
      throw err;
    }
  };