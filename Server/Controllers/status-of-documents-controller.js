import StatusOfDocuments from "../Models/status-of-documents-model.js"
import RawTextOutput from "../Models/raw-ocr-output-model.js";


const getStatusOfDocuments = async function(req, res, next) {
  //Get the name
  const name = req.body.vorgang;
  
  //TODO create helper function that finds the document you are lookging for


  //TODO Get the corresponding invoice

  async function findDocument(docType, name){

  // TODO Loop through all pages

    try{
      //TODO find all document pages that correspond to the name of the transaction
      const foundInvoice = await RawTextOutput.findOne({
        filename: docType+name+'-'+'0'+'.jpg'
      })
      console.log(foundInvoice);
      if(foundInvoice) {
        const invoiceData = foundInvoice.toObject();
        res.status(201).send(JSON.stringify(invoiceData))
      } else {
        res.status(404).send('No matching document found')
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
    //if it doesnt exist, return null

    //TODO check all documents that belong to that invoice for amount and transport number

  //TODO get the corresponding order

    //TODO find all order document pages that correspond to the name of the transaction.
    //if it doesn't exist, return null

    //TODO check all documents that belong to that order for the amount and transport number
      //transport number is only a boolean here.

    //
  //TODO get the corresponding pod

    //TODO find all pd document pages that correspond to the name of the transaction.
    //if it doesn't exist, return null

    //TODO check all documents that belong to that pod for a signature


}

export default getStatusOfDocuments