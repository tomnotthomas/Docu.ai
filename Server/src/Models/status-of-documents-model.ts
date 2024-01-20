import {Schema, model} from 'mongoose';

interface IStatus {
  workpackage: string;
  documents : string;
}


const Status = new Schema<IStatus> ({
  workpackage: {
    type: String,
    required: true
  },
  documents:{
    type: String,
    required: true
  }
})


const StatusOfDocuments = model<IStatus>('StatusOfDocumentsSchema', Status);

export default StatusOfDocuments;