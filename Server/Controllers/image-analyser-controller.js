import { TextractClient, AnalyzeExpenseCommand, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { fromIni } from '@aws-sdk/credential-providers';
import 'dotenv/config'
import RawTextOutput from "../Models/raw-ocr-output-model.js";

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
  FeatureTypes: ['TABLES', 'FORMS', 'SIGNATURES'],
};

  //if it is an invoice, we can get the total amount to be paid.
  const command = new AnalyzeExpenseCommand(params);
  const totalResponse = await textractClient.send(command);

const displayBlockInfo = async (response) => {
  try {
    let words = [];
    let handwriting= false;
    let signature =false;
    response.Blocks.forEach(block => {
      // Filter for lines and words only
      if ( block.BlockType === 'WORD') {
        words.push(block.Text.toLowerCase());
      }
    // Check whether we have handwriting in the document. We can use that to recognize the POD
     if (block.TextType === 'HANDWRITING'){
      handwriting = true;
     }
     //Check whether we have a signature on the document
     if(block.BlockType === 'SIGNATURE'){
      signature = true
     }
    })
    
//Find the total price (total amount for the invoice)
function findPriceText(data) {
  //evaluate whether the document is actually an expense document
  //In this case, I only evaluate, whether the document is an invoice, by checking the 
  //document name.
  if(req.body.photo.slice(0,8) === 'Rechnung'){
   // Iterate over each ExpenseDocument
   for (const expenseDocument of data.ExpenseDocuments) {
    // Check each LineItemGroup in the ExpenseDocument
    for (const lineItemGroup of expenseDocument.LineItemGroups) {
      // Check each LineItem in the LineItemGroup
      for (const lineItem of lineItemGroup.LineItems) {
        // Check each LineItemExpenseField in the LineItem
        for (const item of lineItem.LineItemExpenseFields) {
          if (item.Type && item.Type.Text === "PRICE") {
            //returns the text as key and amount of money
            return item.ValueDetection.Text ;
            }
          }
        }
      }
    }
  }
 else if (req.body.photo.slice(0,7) === 'Auftrag'){
    // Join the text array into a single string
    const text = words.join(" ");

    // Regular expression to match and capture monetary amounts
    const regex = /(?<!\d[.,])(\d{1,3}(?:[.,]\d{3})*[.,]?\d*)\s*(€|eur)|€\s*(\d{1,3}(?:[.,]\d{3})*[.,]?\d*)/gi;

    let highestAmount = 0;
    let match;

    // Search for all matches and determine the highest amount
    while ((match = regex.exec(text)) !== null) {
        const amount = parseFloat(match[1]);
        if (amount > highestAmount) {
            highestAmount = amount;
        }
    }

    // Return the highest amount, or null if no amounts were found
    return highestAmount === 0 ? null : highestAmount.toFixed(2);
    }  
  }



//Check whether the document is an invoice. If it is an invoice, there shouldnt be any value for the order.
const priceText = findPriceText(totalResponse);
const testForInvoice = function (documentName) {
  if(documentName.slice(0,8) !== 'Rechnung'){
    return null
  } else return priceText
}
const checkedpriceTextForInvoice = testForInvoice(req.body.photo);


//check whether the document is an order. If it is an order there shouldnt be any value for the invoice.
const testForOrder = function (documentName) {
  if(documentName.slice(0,7) !== 'Auftrag'){
    return null
  } else return priceText
}
const checkedpriceTextForOrder = testForOrder(req.body.photo);


//find transportnumber

//This finds the Transport number. Currently only for the Jitpay invoice template.
const findTransportNumber = async () => {
  try {
    const analyzeDocCommand = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDocCommand);

    let targetBlockGeometry = null;
    let transportNumber = null;

    // First, find the block containing "Ladung lt. Transportauftrag" and get its geometry
    for (const block of response.Blocks) {
      if (block.BlockType === "LINE" && block.Text.includes("Ladung lt. Transportauftrag")) {
        targetBlockGeometry = block.Geometry.BoundingBox;
        break;
      }
    }

    // If the target block is found, find the text in the column below it
    if (targetBlockGeometry) {
      for (const block of response.Blocks) {
        if (block.BlockType === "LINE") {
          const currentBlockGeometry = block.Geometry.BoundingBox;
          // Check if the current block is below the target block
          if (currentBlockGeometry.Top > targetBlockGeometry.Top + targetBlockGeometry.Height
              && currentBlockGeometry.Left < targetBlockGeometry.Left + targetBlockGeometry.Width
              && currentBlockGeometry.Left + currentBlockGeometry.Width > targetBlockGeometry.Left) {
            transportNumber = block.Text;
            break;
          }
        }
      }
    }

    return transportNumber;
  } catch (err) {
    console.log("Error", err);
  }
};

const foundTransportNumber = await findTransportNumber();



const rawOutput = await RawTextOutput.create({
  filename: req.body.photo,
  text: JSON.stringify(words),
  //If the document includes an Iban and an Account owner, it is an Invoice Betrag is the amount on the invoice
  invoice: JSON.stringify({
    isinvoice: (
      req.body.photo.slice(0,8) === 'Rechnung' ),
    Betrag: checkedpriceTextForInvoice,
    Transportauftragsnummer: foundTransportNumber}),
  //If the document has handwriting and the name of the document starts with POD, true, Unterschrift means signature. Checks for that as well.
  pod: JSON.stringify({
    isPOD: (req.body.photo.slice(0,3) === 'POD'),
    Unterschrift: signature
  }),
  //if the document includes certain words or the name of the document starts with Auftrag, true, Betrag is the amount
  order: JSON.stringify({
    isorder: (req.body.photo.slice(0,7) === 'Auftrag'),
    Betrag: checkedpriceTextForOrder})
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