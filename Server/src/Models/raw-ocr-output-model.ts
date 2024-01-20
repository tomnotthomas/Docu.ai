import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const RawOutput = new Schema ({
  filename: {
    type: String,
    required: true
  },
  text:{
    type: String,
    required: true
  },
  invoice: {
    type: String,
    required: true
  },
  pod: {
    type: String,
    required: true
  },
  order: {
    type: String,
    required: true
  }
})

const RawTextOutput = mongoose.model('RawoutputSchema', RawOutput);

export default RawTextOutput;