const gallerySchema = require("../modal/galleryModal");
const router = require("express").Router();
const upload = require("../util/imageUploader");
const fs = require('fs');
const { findByIdAndUpdate } = require("../modal/userModal");



router.get("/",async(req,res)=>{
    try {
        const gallery = await gallerySchema.find();
        res.status(200).json(gallery)
    } catch (error) {
        res.status(500).json("Something went Wrong")
    }
})



router.post("/", upload.single("galleryimg"), async (req, res) => {
    try {
        
        const newgallerydata = {
            Image :req.file.filename
        }
        const gallerydata = new gallerySchema(newgallerydata);
        await gallerydata.save();
        res.status(200).json({ success: true, message: "Image Uploaded Successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Image Not Uploaded Try Again" })
    }
},
    (error, req, res, next) => {
        if (error) {
            res.status(500).json(error.message)
        }

    })



router.put("/:id", upload.single("galleryimg"), async (req, res) => {
    try {
       
        const updates = {
            Image :req.file.filename
        }

        if (req.file) {
            const gallery = await gallerySchema.findById(req.params.id);
            const imgpath = `images/gallery/${gallery.Image}`;
            fs.unlinkSync(imgpath)
        }

        const updatedgallery = await gallerySchema.findByIdAndUpdate(req.params.id,{
            $set:updates
        },{new:true})

        res.status(200).json({success:true,message:"Image Updated Successfully"})

    } catch (error) {
        res.status(500).json({success:false,message:"Image not Updated Successfully"})
    }
}, (error, res, req, next) => {
    if (error) {
        res.status(500).send(error.message)
    }
}
)




router.delete("/:id", async (req, res) => {
    try {
        const gallery = await gallerySchema.findByIdAndDelete(req.params.id)
        const imgPath = `images/gallery/${gallery.Image}`;
        fs.unlinkSync(imgPath)
        res.status(200).json({ success: true, message: "Image has been deleted Successfully" })
    } catch (error) {
        res.status(500).json({success:false,message:"Image has not been deleted"})
    }
})




router.get("/:id", async (req, res) => {
    try {
        // console.log(req.params.id)
        const gallery = await gallerySchema.findById(req.params.id);
        res.status(200).json(gallery)
    } catch (error) {
        res.status(500).json({success:false,message:"Image not Fetched"})
    }
})

module.exports = router