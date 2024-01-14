import StatusOfDocuments from "../Models/status-of-documents-model.js"
import RawTextOutput from "../Models/raw-ocr-output-model.js";


const getStatusOfDocuments = async function(req, res, next) {
  //Get the name
  const name = req.body.vorgang;
  
  //TODO Get the corresponding invoice
  try{
    //TODO find all invoice document pages that correspond to the name of the transaction
    const foundInvoice = await RawTextOutput.findOne({
      filename: 'Rechnung'+name+'-'+'0'+'.jpg'
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