import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const opportunitySchema = new mongoose.Schema({
  OpportunityID: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  LeadID: {
    type: mongoose.Schema.Types.String,
    ref: 'Lead',
    required: true,
  },
  AccountID: {
    type: mongoose.Schema.Types.String,
    ref: 'Account',
    required: true,
  },
  SalesStage: {
    type: String,
    enum: ['Prospecting', 'Qualification', 'Negotiation', 'Closed Won', 'Closed Lost'],
    required: true,
  },
  ExpectedRevenue: {
    type: Number,
    min: 0, 
    required: true,
  },
  CloseDate: {
    type: Date,
    required: true, 
  },
  AssignedTo: {
    type: String, 
    required: true,
  },
}, {
  timestamps: true, 
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);
export default Opportunity;
