import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const RecipientSchema = new mongoose.Schema({
    recipientID: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: null
    },
    category: {
        type: String,
        required: true
    },
    city: String,
    tag: String,
    additionalData: String
})

const Recipient = mongoose.models.Recipient || mongoose.model('Recipient', RecipientSchema);

export default Recipient;