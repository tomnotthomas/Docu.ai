import StatusOfDocuments from "../Models/status-of-documents-model.js"




const deleteStatusOfDocuments = async function(req, res, next) {
  try {
    const result = await StatusOfDocuments.findOneAndDelete({ workpackage: req.body.vorgang });
    
    if (!result) {
      return res.status(200).send('No documents to delete :)');
    }

    res.status(200).send('All Good!');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}

export default deleteStatusOfDocuments;