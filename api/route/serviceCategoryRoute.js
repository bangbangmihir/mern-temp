const router = require("express").Router();
const servicecategoryschema = require("../modal/serviceCategoryModal");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../util/verifyToken");



//GET SERVICE CATEGORY
router.get("/",async(req,res)=>{
    try {
        const review = await servicecategoryschema.find()
        res.status(200).json(review)
    } catch (error) {
        res.status(500).json("Error Occured while Fetching Review")
    }
})

//POST SERVICE CATEGORY
router.post("/",async(req,res)=>{
    try {
        const servicecategory = await servicecategoryschema.create(req.body)
        res.status(200).json({success:true,message:"Service Category Uploaded"})
    } catch (error) {
        res.status(500).json({success:false,message:"Service Not Uploaded"})
    }
})


//PUT SERVICE CATEGORY
router.put("/:id",async(req,res)=>{
    try {
        const updatedcategory = await servicecategoryschema.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})

        res.status(200).json({success:true,message:"Category updated"})
    } catch (error) {
        res.status(500).json({success:false,message:"Category not Updated"})
    }
})


//DELETE SERVICE CATGORY
router.delete("/:id",async(req,res)=>{
    try {
        await servicecategoryschema.findByIdAndDelete(req.params.id)
        res.status(200).json({success:true,message:"Category Deleted Successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:"Category Not Deleted"})
    }
})




//GET SERVICE CATEGORY
router.get("/:id",async(req,res)=>{
    try {
        const category = await servicecategoryschema.findById(req.params.id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong"})
    }
})



module.exports = router