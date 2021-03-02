const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{type:String},
    surname:{type:String},
    email:{type:String},
    password:{type:String},
    img:{type:String},
    cover:{type:String},
    fb:{type:String},
    insta:{type:String},
    pin:{type:String},
    bio:{
        type:String,
    }
})
const User=mongoose.model('User',userSchema);
module.exports=User;