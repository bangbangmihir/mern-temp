
const otpSchema = require("../modal/otpModal");
const userSchema = require("../modal/userModal");
const router = require("express").Router();
const mail = require("../util/nodemailer")


router.post("/", async (req, res) => {
    try {
        const user = await userSchema.findOne({ Email: req.body.Email })
        // console.log("ss",user)
        if (user) {
            const otp = Math.floor((Math.random() * 1000000) + 1)
            const otpdata = new otpSchema({
                Email: req.body.Email,
                Otp: otp,
                expiresIn: new Date().getTime() + 6000 * 100
            })
            await otpdata.save()
            //Mail Send 
            mail(req.body.Email, "Your Forgot Password Otp is", "Forgot Password", otp)
            res.status(200).json("Otp Sent Successfully")
        } else {
            res.status(500).json("Email is not Valid")
        }
    } catch (error) {
        res.status(500).json({success:false,message:"Otp Not genrated"})
    }
})

router.post("/changepassword",async(req,res)=>{
    try {
        const {Email,Otp,Password} = req.body;
        const mailotp = await otpSchema.findOne({ Email: req.body.Email, Otp: req.body.Otp })
        if(mailotp){
            const currentTime  = new Date().getTime()
            const diff = mailotp.expiresIn -  currentTime;
            if(diff>0){
                const user = await userSchema.findOne({Email})
                const updatedpassword = await userSchema.findByIdAndUpdate(user._id,{
                    $set:{
                        Password : req.body.Password
                    }
                },{new:true});
                res.status(200).json({success:true,message:"Password Updated Successfully"})
            }else{
                res.status(500).json({success:false,message:"Otp Timeout "})
            }
        }
        else {
            res.status(500).json({success:false,message:"Otp Not Valid"})
        }
        
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong"})
    }
})




module.exports = router

