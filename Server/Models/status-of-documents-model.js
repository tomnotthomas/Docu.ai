import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const Status = new Schema ({
  workpackage: {
    type: String,
    required: true
  },
  documents:{
    type: String,
    required: true
  }
})


const StatusOfDocuments = mongoose.model('StatusOfDocumentsSchema', Status);

export default StatusOfDocuments;