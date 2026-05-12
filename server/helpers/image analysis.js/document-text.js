import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";

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