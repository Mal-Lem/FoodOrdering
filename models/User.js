import { models, Schema,model } from "mongoose";
import { type } from 'os';

const UserSchema = new Schema({
  name:{type:String},
  email:{
    type:String,
    required:true, 
    unique:true},
  password:{
    type:String, 
    // required:true, 
    // validate:pass=>{
    //   if(!pass?.length || pass.length <5 ){
    //     new Error('password must be at least 5 characters');
    //     return false;
    //   }
    // },
  }, 
}, {timestamps:true});

// UserSchema.post('validate',function(user){
// })
export const User = models?.User || model('User',UserSchema);

