import {Schema, model, models} from 'mongoose';
let roleSchema = new Schema({
 name:String,
 //unique: true
})

let Role = models.Role || model('Role',roleSchema);
export default Role;