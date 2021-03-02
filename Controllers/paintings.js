
const Painting = require('../Model/paintings');
const jwt = require('jsonwebtoken');
const config = require('../Config/config');
const {verifyUser}=require('./auth');

const create = (req, res, data) => {

        const painting = new Painting({ ...data});
        painting.save() 
}

const getpaining=async(req,res)=>{
 let key=req.headers.gallery;
 const user = await Painting.find({'subject':key})
 res.send(user)
}
const getOne=async(req,res)=>{
 let key=req.headers.key;
 const user = await Painting.findOne({'_id':key})
 res.send(user)
}
const updatePainting=async(req,res)=>{
    const {id}=req.body;
    const user= await Painting.findOneAndUpdate({_id:id},{$set:{...req.body}})
}
const deletePainting=async(req,res)=>{
    const {id}=req.body;
    const user= await Painting.findByIdAndDelete({_id:id})
}
module.exports = {
    create,
    getpaining,
    getOne,
    updatePainting,
    deletePainting,
}