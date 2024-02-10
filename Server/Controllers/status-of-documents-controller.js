import StatusOfDocuments from "../Models/status-of-documents-model.js"
import RawTextOutput from "../Models/raw-ocr-output-model.js";

const getStatusOfDocuments = async function(req, res, next) {
  //Get the name
  const nameOfDoc = req.body.vorgang;
  

  async function findDocument(docType, name, i){
    try{
      //TODO find all document pages that correspond to the name of the transaction
      const foundDoc = await RawTextOutput.findOne({
        filename: docType+name+'-'+i+'.jpg'
      })
      if(foundDoc) {
        const data = foundDoc.toObject();
        return JSON.stringify(data)
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
      let foundDocs =[];

      for (let i = 0; ; i++){
        const doc = await findDocument(docType, nameOfDoc, i);
        if(doc) {
          foundDocs.push(doc)
        }  else {break}
      }
      return foundDocs;
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

  //Write this to the database
   const allPagesAndInfo = await StatusOfDocuments.create({
    workpackage: req.body.vorgang,
    documents: JSON.stringify(allDocswithAllPages)
   })   
      res.status(201).send(allPagesAndInfo);
    } catch (err) {
      console.log(err)
    }
  }


  return getAllPagesOfAllThreeDocs();


}

export default getStatusOfDocuments