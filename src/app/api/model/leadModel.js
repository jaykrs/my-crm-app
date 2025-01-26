import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const leadSchema = new mongoose.Schema({
  LeadID: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  Source: {
    type: String,
    enum: ['Website', 'Referral', 'Event', 'Other'],
    required: true,
  },
  Subject: {
    type: String
  },
  Description: {
    type: String
  },
  ContactInformation: {
    Name: { type: String, required: true },
    Phone: { type: String },
    Email: { 
      type: String,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); 
        },
        message: props => `${props.value} is not a valid email!`,
      },
    },
    Address: { type: String },
  },
  CompanyInformation: {
    CompanyName: { type: String },
    Industry: { type: String },
    Revenue: { type: Number, min: 0 },
  },
  Status: {
    type: String,
    enum: ['New', 'Qualified', 'Disqualified', 'In Progress'], 
    default: 'New',
    required: true,
  },
  AssignedTo: {
    type: String,
    default: 'admin'
  },
}, {
  timestamps: true,
});

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

export default Lead;
