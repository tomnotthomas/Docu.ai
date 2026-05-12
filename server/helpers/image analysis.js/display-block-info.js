import { findTransportNumber } from "./transportnr-finder"; 
import RawTextOutput from '../Models/raw-ocr-output-model.js';

 export const displayBlockInfo = async (response) => {
    try {
      let words = [];
      let handwriting = false;
      let signature = false;

      response.Blocks.forEach((block) => {
        // Filter for lines and words only
        if (block.BlockType === 'WORD') {
          words.push(block.Text.toLowerCase());
        }
        // Check whether we have handwriting in the document. We can use that to recognize the POD
        if (block.TextType === 'HANDWRITING') {
          handwriting = true;
        }
        //Check whether we have a signature on the document
        if (block.BlockType === 'SIGNATURE') {
          signature = true;
        }
      });

      //Check whether the document is an invoice. If it is an invoice, there shouldnt be any value for the order.
      const priceText = findPriceText(totalResponse);
      const testForInvoice = function (documentName) {
        if (documentName.slice(0, 8) !== 'Rechnung') {
          return null;
        } else return priceText;
      };
      const checkedpriceTextForInvoice = testForInvoice(photo);

      //check whether the document is an order. If it is an order there shouldnt be any value for the invoice.
      const testForOrder = function (documentName) {
        if (documentName.slice(0, 7) !== 'Auftrag') {
          return null;
        } else return priceText;
      };
      const checkedpriceTextForOrder = testForOrder(photo);

      const foundTransportNumber = await findTransportNumber();

      const rawOutput = await RawTextOutput.create({
        filename: photo,
        text: JSON.stringify(words),
        //If the document includes an Iban and an Account owner, it is an Invoice Betrag is the amount on the invoice
        invoice: JSON.stringify({
          isinvoice: photo.slice(0, 8) === 'Rechnung',
          Betrag: checkedpriceTextForInvoice,
          Transportauftragsnummer: foundTransportNumber,
        }),
        //If the document has handwriting and the name of the document starts with POD, true, Unterschrift means signature. Checks for that as well.
        pod: JSON.stringify({
          isPOD: photo.slice(0, 3) === 'POD',
          Unterschrift: signature,
        }),
        //if the document includes certain words or the name of the document starts with Auftrag, true, Betrag is the amount
        order: JSON.stringify({
          isorder: photo.slice(0, 7) === 'Auftrag',
          Betrag: checkedpriceTextForOrder,
        }),
      });
      return rawOutput;
    } catch (err) {
      console.log('Error', err);
    }
  };




        //Find the total price (total amount for the invoice)
      function findPriceText(data) {
        //evaluate whether the document is actually an expense document
        //In this case, I only evaluate, whether the document is an invoice, by checking the
        //document name.
        if (photo.slice(0, 8) === 'Rechnung') {
          // Iterate over each ExpenseDocument
          for (const expenseDocument of data.ExpenseDocuments) {
            // Check each LineItemGroup in the ExpenseDocument
            for (const lineItemGroup of expenseDocument.LineItemGroups) {
              // Check each LineItem in the LineItemGroup
              for (const lineItem of lineItemGroup.LineItems) {
                // Check each LineItemExpenseField in the LineItem
                for (const item of lineItem.LineItemExpenseFields) {
                  if (item.Type && item.Type.Text === 'PRICE') {
                    //returns the text as key and amount of money
                    return item.ValueDetection.Text;
                  }
                }
              }
            }
          }
        } else if (photo.slice(0, 7) === 'Auftrag') {
          // Join the text array into a single string
          const text = words.join(' ');

          // Regular expression to match and capture monetary amounts
          const regex =
            /(?<!\d[.,])(\d{1,3}(?:[.,]\d{3})*[.,]?\d*)\s*(€|eur)|€\s*(\d{1,3}(?:[.,]\d{3})*[.,]?\d*)/gi;

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