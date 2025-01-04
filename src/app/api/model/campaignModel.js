import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const campaignSchema = new mongoose.Schema({
  CampaignID: {
    type: String,
    default: uuidv4, 
    unique: true,
    required: true,
  },
  CampaignName: {
    type: String,
    required: true, 
  },
  StartDate: {
    type: Date,
    required: true, 
  },
  EndDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.StartDate; 
      },
      message: 'EndDate must be later than StartDate.',
    },
  },
  Budget: {
    type: Number,
    min: 0, 
    required: true,
  },
  TargetAudience: {
    type: String, 
  },
  Channels: {
    type: [String],
    enum: ['Email', 'SMS', 'Social Media', 'Other'],
  },
  Results: {
    ClickThroughRate: { type: Number, min: 0, max: 100 }, 
    ConversionRate: { type: Number, min: 0, max: 100 }, 
  },
}, {
  timestamps: true, 
});

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
