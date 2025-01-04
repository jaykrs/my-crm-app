import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const accountSchema = new mongoose.Schema({
  AccountID: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  AccountName: {
    type: String,
    required: true,
  },
  Industry: {
    type: String,
  },
  Revenue: {
    type: Number,
    min: 0,
  },
  Address: {
    type: String,
  },
  Website: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([^\s.]+\.[^\s]{2,}|localhost[^\s]*)$/i.test(v); 
      },
      message: props => `${props.value} is not a valid website URL!`,
    },
  },
  CustomerID: {
    type: mongoose.Schema.Types.String,
    ref: 'Customer', 
    required: true,
  },
}, {
  timestamps: true,
});

const Account = mongoose.model('Account', accountSchema);
export default Account;
