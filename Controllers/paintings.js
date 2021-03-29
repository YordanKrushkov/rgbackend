
const Painting = require('../Model/paintings');
const jwt = require('jsonwebtoken');
const config = require('../Config/config');
const { verifyUser } = require('./auth');
const { uploader,destroyImage,destroyImages } = require('../Utils/Images');
const { findByIdAndUpdate, findOneAndUpdate } = require('../Model/paintings');

const create = async (req, res) => {
    const prop = req.body.prop;
    // const painting = new Painting({ ...data });
    // painting.save()
    try {
        const imgs = await uploader(req);
        const img = await imgs[0];
        // const key = jwt.verify(token, config.privateKey);
        const painting = new Painting({ ...prop, profile: img, imgs: imgs });
        const paintings = await painting.save();
        return paintings;
    } catch (error) {
        console.log(error);
    }
}

const getpaining = async (req, res) => {
    let key = req.headers.gallery;
    const user = await Painting.find({ 'subject': key })
    res.send(user)
}
const getOne = async (req, res) => {
    let key = req.headers.key;
    const user = await Painting.findOne({ '_id': key })
    res.send(user)
}
const updatePainting = async (req, res) => {
    const { id, painting } = req.body.prop;
    let user
    const imgs = await uploader(req);
    if (imgs && imgs.length !== 0) {
        user = await Painting.findOneAndUpdate({ _id: id }, { "$addToSet": { "imgs": [...imgs] } })
    }
    if (painting) {
        delete painting.imgs;
        user = await Painting.findOneAndUpdate({ _id: id }, { $set: { ...painting } });
    }
    return user
}
const updateProfilePicture = async (req, res) => {
    const {id, profile}=req.body;
    const painting=await Painting.findByIdAndUpdate({_id:id}, {$set:{profile:profile}});
    return painting;
}
const deletePainting = async (req, res) => {
    const { id, imgs } = req.body;
    await destroyImages(imgs);
    const user = await Painting.findByIdAndDelete({ _id: id })
    return user
}

const deleteImagesAndUpdate=async(req,res)=>{
    const {id, img}=req.body;
    const painting=await Painting.findOneAndUpdate({_id:id}, {"$pull":{"imgs":img}})
    await destroyImage(img);
    return painting

};
module.exports = {
    create,
    getpaining,
    getOne,
    updatePainting,
    deletePainting,
    deleteImagesAndUpdate,
    updateProfilePicture,
}