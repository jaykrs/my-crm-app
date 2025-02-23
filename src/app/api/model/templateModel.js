import mongoose from 'mongoose';
import { type } from 'os';
import { v4 as uuidv4 } from 'uuid';

const templateSchema = new mongoose.Schema({
  temID: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  temName:{
    type: String,
    default:""
  },
  temCode:{
    type: String,
    default:""
  },
  userName:{
    type:String,
    required:true
  }
}, {
  timestamps: true, 
});

const Template = mongoose.models.Template || mongoose.model('Template', templateSchema);
export default Template;
