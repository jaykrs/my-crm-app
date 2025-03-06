import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const RecipientGroupSchema = new mongoose.Schema({
    recipientGroupID: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    recipientList: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
})

const RecipientGroup = mongoose.models.RecipientGroup || mongoose.model('RecipientGroup', RecipientGroupSchema);

export default RecipientGroup;