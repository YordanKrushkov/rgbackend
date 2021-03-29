const { cloudinary } = require('../Config/cloudinary');

//Upload Images
const uploader = async (req) => {
    const fileStr = req.body.data;
 
    let imgs = [];
    try {
        for (let i = 0; i < fileStr.length; i++) {
            let file = fileStr[i];
            const uploadResponse = await cloudinary.uploader.upload(file, {
                upload_preset: "rgArtGallery"
            })
            imgs.push(uploadResponse.public_id);
        }
        return imgs;
    } catch (error) {
        console.error(error);
        return;
    }
};

//Delete Images
const destroyImages = async (id) => {
    try {

        for (let i=0; i<id.length; i++){
            await cloudinary.uploader.destroy(id[i], {
                upload_preset: "rgArtGallery"
            });
        }
       return true;
    } catch (error) {
        console.error(error);
    }
}
//Delete Single Img
const destroyImage = async (id) => {
    try {
          const res=await cloudinary.uploader.destroy(id, {
                upload_preset: "rgArtGallery"
            });
       return res;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    uploader,
    destroyImages,
    destroyImage
}