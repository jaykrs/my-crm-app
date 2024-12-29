import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: String,
  username:String,
  email: {
    type: String,
    required: true,
    //unique: true,
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false,
    required: true
  },
  createby: String,
  token: { type: String },
  role:String,
  createdAt:{
    type:Date,
    default:Date.now
  },
  otp:Number
});

const User = models.User || model('User', userSchema);

export default User;