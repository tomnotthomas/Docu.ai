import StatusOfDocuments from "../Models/status-of-documents-model.js"


const getAllDocuments= async function(req, res, next) {
  try{
  const allDocuments = await StatusOfDocuments.find({});
  res.status(201).send(allDocuments);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err);
  }
}


export default getAllDocuments