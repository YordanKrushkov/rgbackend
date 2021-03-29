const express = require('express');
const router = express.Router();
const {create,getpaining,getOne,updatePainting,deletePainting,deleteImagesAndUpdate,updateProfilePicture} = require('../Controllers/paintings')

router.post('/create', async (req, res) => {
   
    const user = await create(req, res);
    res.send(req.body)
})
router.get('/get', async (req, res) => {
    const user = await getpaining(req, res);
})
router.get('/getone', async (req, res) => {
    const painting = await getOne(req, res);
})
router.post('/updateone', async (req, res) => {
    const painting = await updatePainting(req, res);
    res.send(req.body)
})
router.post('/delete', async (req, res) => {
    const painting = await deletePainting(req, res);
    res.send(req.body)
})
router.post('/deleteandupdate',async(req,res)=>{
    const painting=await deleteImagesAndUpdate(req,res);
    painting ?res.status(200).send(painting):res.status(404).send();
})
router.post('/updateProfilePicture',async(req,res)=>{
    const painting=await updateProfilePicture(req,res);
    painting ?res.status(200).send(painting):res.status(404).send();
})
module.exports=router