import { models, Schema,model } from "mongoose";
import { type } from "os";

const UserSchema = new Schema({
  name:{type:String},
  email:{type:String,required:true, unique:true},
  password:{type:String}, 
  phone:{type:String},
  streetAdress:{type:String},  
  postalCode:{type:String},
  city:{type:String},
  country:{type:String},
  admin:{type:Boolean,default:false},
}, {timestamps:true});


export const User = models?.User || model('User',UserSchema);

