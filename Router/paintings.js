const express = require('express');
const router = express.Router();
const {create,getpaining,getOne,updatePainting,deletePainting} = require('../Controllers/paintings')

router.post('/create', async (req, res) => {
    const data = req.body;
    const user = await create(req, res, data);
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
router.delete('/delete', async (req, res) => {
    const painting = await deletePainting(req, res);
    res.send(req.body)
})

module.exports=router