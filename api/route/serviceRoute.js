const router = require("express").Router();
const serviceSchema = require("../modal/serviceModal");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../util/verifyToken");
const upload = require("../util/imageUploader");
const fs = require("fs")



//GET SERVICE
router.get("/",async(req,res)=>{
    try {
        const service = await serviceSchema.find().populate("serviceType");
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({success:false,message:"Error while fetching Service"})
    }
})


//POST SERVICE
router.post("/",upload.single("serviceimg"),async(req,res)=>{
    try {
        const {ServiceName,ServicePrice,ServiceHeading,ServiceDescription,serviceType} = req.body
        const ServiceImage = req.file.filename;

        const newServiceData = {
            ServiceName,
            ServicePrice,
            ServiceHeading,
            ServiceDescription,
            serviceType,
            ServiceImage
        }

        const servicedata = new serviceSchema(newServiceData);
        await servicedata.save();
        res.status(200).json({success:true,message:"Service uploaded Successfully"})
        
    } catch (error) {
        res.status(500).json({success:false,message:"Service Not Uploaded"})
    }
},
(error, req, res, next) => {
    if (error) {
        res.status(500).send(error.message);
    }
}
)


//PUT SERVICE
router.put("/:id",upload.single("serviceimg"),async(req,res)=>{
try {
    const {ServiceName,ServicePrice,ServiceHeading,ServiceDescription,serviceType} = req.body
    console.log(ServiceName,ServicePrice,ServiceHeading,ServiceDescription,serviceType)
    const service = {
        ServiceName,
        ServicePrice,
        ServiceHeading,
        ServiceDescription,
        serviceType
    }
    if(req.file){

        console.log(req.file.filename)

        service.ServiceImage = req.file.filename
        //Delete previous image from the server

        const getservice = await serviceSchema.findById(req.params.id)
        const imgPath = `images/service/${getservice.ServiceImage}`;
        fs.unlinkSync(imgPath)
    }


    const serviceupdated = await serviceSchema.findByIdAndUpdate(req.params.id,{
        $set:service
    },{new:true});

    res.status(200).json({success:true,message:"Service Updated Successfully"})

} catch (error) {
    res.status(500).json({success:false,message:"Service Not Updated Successfully"})
}
},
(error,req,res,next)=>{
    if(error){
        res.status(500).send(error.message)
    }
}
)

//DELETE SERVICE
router.delete("/:id",async(req,res)=>{
    try {
    const service = await serviceSchema.findByIdAndDelete(req.params.id);

    //Service image delete from server
    const imgPath = `images/review/${service.ServiceImage}`;
    fs.unlinkSync(imgPath)

    res.status(200).json({success:true,message:"Service Deleted Successfully"})

    } catch (error) {
        res.status(500).json({success:false,message:"Service not Deleted"})
    }
})


//SERVICE DETAILS
router.get("/:id",async(req,res)=>{
    try {
        const service = await serviceSchema.findById(req.params.id).populate("serviceType")
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({success:false,message:"Service details uploaded successfully"})
    }
})


module.exports = router