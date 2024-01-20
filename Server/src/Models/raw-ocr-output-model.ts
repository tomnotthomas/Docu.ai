import {Schema, model} from 'mongoose'
interface IRawOutput {
  filename : string;
  text : string;
  invoice : string;
  pod : string;
  order : string;
}

const RawOutput = new Schema<IRawOutput> ({
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

const RawTextOutput = model<IRawOutput>('RawoutputSchema', RawOutput);

export default RawTextOutput;