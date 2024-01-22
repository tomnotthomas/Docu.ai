import StatusOfDocuments from "../Models/status-of-documents-model.js"
import { Request, Response} from 'express';



const deleteStatusOfDocuments = async function(req: Request, res: Response) {
  try {
    const result = await StatusOfDocuments.findOneAndDelete({ workpackage: req.body.vorgang });

    if (!result) {
      return res.status(200).send('No documents to delete :)');
    }

    res.status(200).send('All Good!');
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
}

export default deleteStatusOfDocuments;