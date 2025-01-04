import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // For generating unique ContactID

const contactSchema = new mongoose.Schema({
    ContactID: {
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
    ContactType: {
        type: String,
        enum: ['Phone', 'Email', 'Social Media'],
        required: true,
    },
    ContactDetails: {
        type: String,
        required: true,
    },
    PreferredContactMethod: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    }
});

// Export the model
const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
