import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const caseSchema = new mongoose.Schema({
  CaseID: {
    type: String,
    default: uuidv4, 
    unique: true,
    required: true,
  },
  CustomerID: {
    type: mongoose.Schema.Types.String,
    ref: 'Customer', 
    required: true,
  },
  Subject: {
    type: String,
    required: true, 
  },
  Description: {
    type: String, 
    required: true,
  },
  Status: {
    type: String,
    enum: ['New', 'Open', 'In Progress', 'Resolved'], 
    default: 'New',
    required: true,
  },
  AssignedTo: {
    type: String, 
    required: true,
  },
  Resolution: {
    type: String,
  },
}, {
  timestamps: true, 
});

const Case = mongoose.model('Case', caseSchema);
export default Case;
