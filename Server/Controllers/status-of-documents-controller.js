import StatusOfDocuments from "../Models/status-of-documents-model"

const getStatusOfDocuments = async function(req, res, next) {
  //Get the name
  const name = req.body.vorgang;
  
  //TODO Get the corresponding invoice

    //TODO find all invoice document pages that correspond to the name of the transaction
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