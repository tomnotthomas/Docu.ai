import { TextractClient, AnalyzeExpenseCommand, AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
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

  //if it is an invoice, we can get the total amount to be paid.
  const command = new AnalyzeExpenseCommand(params);
  const totalResponse = await textractClient.send(command);
  const positionInArray  = totalResponse.ExpenseDocuments[0]
  console.log({positionInArray});

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
            return item.ValueDetection ;
            }
          }
        }
      }
    }
  }
 else if (req.body.photo.slice(0,7) === 'Auftrag'){
    // Join the text array into a single string
    const text = words.join(" ");
    console.log({text});

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




const priceText = findPriceText(totalResponse);
console.log({priceText});




const rawOutput = await RawTextOutput.create({
  filename: req.body.photo,
  text: JSON.stringify(words),
  //If the document includes an Iban and an Account owner, it is an Invoice Betrag is the amount on the invoice
  invoice: JSON.stringify({isinvoice: (words.includes('kontoinhaber:') || words.includes('kontoinhaber') && words.includes('iban') || words.includes('iban:') || req.body.photo.slice(0,8) === 'Rechnung' ), Betrag: priceText}),
  //If the document has handwriting and the name of the document starts with POD, true, Unterschrift means signature. Checks for that as well.
  pod: JSON.stringify({isPOD: (req.body.photo.slice(0,3) === 'POD'), Unterschrift: signature}),
  //if the document includes certain words or the name of the document starts with Auftrag, true, Betrag is the amount
  order: JSON.stringify({
    isorder:(words.includes('bestellung') ||
    words.includes('bestellung:') ||
    words.includes('transportauftrag') ||
    words.includes('transportauftrag:') ||
    words.includes ('transportauftrag, ') ||
    words.includes('transportauftrag,') ||
    req.body.photo.slice(0,7) === 'Auftrag'),
    Betrag: priceText})
}) 
res.status(201).send(totalResponse);
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