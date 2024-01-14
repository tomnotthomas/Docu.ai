import StatusOfDocuments from "../Models/status-of-documents-model.js"
import RawTextOutput from "../Models/raw-ocr-output-model.js";


const getStatusOfDocuments = async function(req, res, next) {
  //Get the name
  const nameOfDoc = req.body.vorgang;
  
  //TODO create helper function that finds the document you are lookging for


  //TODO Get the corresponding invoice



  async function findDocument(docType, name, i){
    try{
      console.log(docType+name+'-'+i+'.jpg')
      //TODO find all document pages that correspond to the name of the transaction
      const foundInvoice = await RawTextOutput.findOne({
        filename: docType+name+'-'+i+'.jpg'
      })
      console.log(foundInvoice);
      if(foundInvoice) {
        const invoiceData = foundInvoice.toObject();
        return JSON.stringify(invoiceData)
      } else {
        return false
      }
    } catch (err) {
      console.log(err);
    }
  }
    async function getAllPages(docType){
      try {
      //Loop through all the pages
      let foundInvoices =[];

      for (let i = 0; ; i++){
        const doc = await findDocument(docType, nameOfDoc, i);
        if(doc) {
          foundInvoices.push(doc)
        }  else {break}
      }
      return foundInvoices
    } catch(err) {
      console.log(err)
    }
  }

  //function that creates one large object that entails all the documents for one nameOfdoc
  async function getAllPagesOfAllThreeDocs() {
    try{
      const allDocswithAllPages = ({
        Rechnung: await getAllPages('Rechnung'),
        Auftrag: await getAllPages('Auftrag'),
        POD: await getAllPages('POD')
       })

      res.status(201).send(allDocswithAllPages);
    } catch (err) {
      console.log(err)
    }
  }

  return getAllPagesOfAllThreeDocs();

  

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