import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";    
    
    //This finds the Transport number. Currently only for the Jitpay invoice template.
      export const findTransportNumber = async () => {
        try {
          const analyzeDocCommand = new AnalyzeDocumentCommand(params);
          const response = await textractClient.send(analyzeDocCommand);

          let targetBlockGeometry = null;
          let transportNumber = null;

          // First, find the block containing "Ladung lt. Transportauftrag" and get its geometry
          for (const block of response.Blocks) {
            if (
              block.BlockType === 'LINE' &&
              block.Text.includes('Ladung lt. Transportauftrag')
            ) {
              targetBlockGeometry = block.Geometry.BoundingBox;
              break;
            }
          }

          // If the target block is found, find the text in the column below it
          if (targetBlockGeometry) {
            for (const block of response.Blocks) {
              if (block.BlockType === 'LINE') {
                const currentBlockGeometry = block.Geometry.BoundingBox;
                // Check if the current block is below the target block
                if (
                  currentBlockGeometry.Top >
                    targetBlockGeometry.Top + targetBlockGeometry.Height &&
                  currentBlockGeometry.Left <
                    targetBlockGeometry.Left + targetBlockGeometry.Width &&
                  currentBlockGeometry.Left + currentBlockGeometry.Width >
                    targetBlockGeometry.Left
                ) {
                  transportNumber = block.Text;
                  break;
                }
              }
            }
          }

          return transportNumber;
        } catch (err) {
          console.log('Error', err);
        }
      };