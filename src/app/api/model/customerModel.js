import {Schema,model,models} from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const customerSchema = new Schema({
    CustomerID: {
      type: String,
      default: uuidv4, // Automatically generates a unique ID
      unique: true,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Company: {
      type: String, // Optional
    },
    JobTitle: {
      type: String, // Optional
    },
    ContactInformation: {
      Phone: {
        type: String,
      },
      Email: {
        type: String,
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); 
          },
          message: props => `${props.value} is not a valid email!`,
        },
      },
      Address: {
        type: String,
      },
    },
    Demographics: {
      Age: {
        type: Number,
        min: 0,
      },
      Gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-Binary', 'Other'],
      },
      Location: {
        type: String,
      },
    },
    Industry: {
      type: String,
    },
    Notes: {
      type: String,
    },
    CommunicationNotes: {
      type: [String],
    },
  }, 
  {
    createAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type:Date,
        default:null
    } 
  });

  const Customer = models.Customer || model('Customer', customerSchema);

export default Customer;
