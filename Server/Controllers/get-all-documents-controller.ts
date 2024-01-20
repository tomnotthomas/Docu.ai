import { DocumentItem } from '../types/custom-types.d';
import StatusOfDocuments from '../Models/status-of-documents-model.ts';

const getAllDocuments= async function(req, res) {
  try{
  const allDocuments = await StatusOfDocuments.find({});
  res.status(201).send(allDocuments);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err);
  }
}


export default getAllDocuments