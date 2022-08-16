const router = require("express").Router();
const reviewSchema = require("../modal/reviewModal");
const upload = require("../util/imageUploader");
const fs = require("fs");



router.get("/", async (req, res) => {
    try {
        const review = await reviewSchema.find();
        res.status(200).json(review)
    } catch (error) {
        res.status(500).json("Error while Fetching Review")
    }
})



router.post("/", upload.single("reviewimg"), async (req, res) => {
    try {
        const { AuthorName, Review } = req.body;
        const AuthorImage = req.file.filename

        const newReviewData = {
            AuthorName,
            Review,
            AuthorImage,
        }
        const reviewdata = new reviewSchema(newReviewData);
        const review = await reviewdata.save();
        res.status(200).json({ success: true, message: "Review Uploaded Successfully" })
    } catch (error) {
        res.status(400).send('Error while uploading file. Try again later.');
    }
},
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    })



router.get("/:id", async (req, res) => {
    try {
        const review = await reviewSchema.findById(req.params.id)
        res.status(200).json(review)
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error occur While getting the Review' })
    }
})



router.put("/:id", upload.single("reviewimg"), async (req, res) => {
    try {
        const { AuthorName, Review } = req.body;
        const updates = {
            AuthorName,
            Review
        }
        if (req.file) {
            const image = req.file.filename;
            updates.AuthorImage = image;
        }

        // For deleting previous image from the server
        if (req.file) {
            const review = await reviewSchema.findById(req.params.id)
            const imgPath = `images/review/${review.AuthorImage}`;
            fs.unlinkSync(imgPath)
        }

        const reviewupdated = await reviewSchema.findByIdAndUpdate(req.params.id, {
            $set: updates
        }, { new: true }
        );

        res.status(200).json({ success: true, message: "Review Updated Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Review Not Updated" })
    }
},
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    }
)


router.delete("/:id", async (req, res) => {
    try {
        const review = await reviewSchema.findByIdAndDelete(req.params.id)

        //Deleting image from The server
        const imgPath = `images/review/${review.AuthorImage}`;
        fs.unlinkSync(imgPath)

        res.status(200).json({ success: true, message: "Review Deleted Successfully" })
    } catch (error) {
        res.status(500).json("Review not Deleted")
    }
})


module.exports = router