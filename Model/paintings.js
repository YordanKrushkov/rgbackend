const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const paintingShema= new Schema({

title:{type:String},
material:{type:String},
mediums:{type:String},
subject:{type:String},
width:{type:String},
length:{type:String},
depth:{type:String},
description:{type:String},
profile:{type:String},
imgs:[],
})

const Painting=mongoose.model('Painting',paintingShema);
module.exports=Painting;