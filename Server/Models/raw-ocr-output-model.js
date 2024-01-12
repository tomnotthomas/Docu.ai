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
  }
})

const RawOutputSchema = mongoose.model('RawoutputSchema', RawOutput);

export default RawOutputSchema;