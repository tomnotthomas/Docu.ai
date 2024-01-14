import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const StatusOfDocuments = new Schema ({
  workpackage: {
    type: String,
    required: true
  },
  documents:{
    type: String,
    required: true
  }
})

export default StatusOfDocuments;