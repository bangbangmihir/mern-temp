const router = require("express").Router();
const UserSchema = require("../modal/userModal");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../util/verifyToken");
const upload = require("../util/imageUploader");
const fs = require("fs")
const jwt = require("jsonwebtoken")
const mail = require("../util/nodemailer");


//GET USER
router.get("/", async (req, res) => {
    try {
        const user = await UserSchema.find();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ success: false, message: "User Not Fetched" })
    }
})



//POST USER
router.post("/", upload.single("userimg"), async (req, res) => {
    try {
        const { FirstName, LastName, UserName, Email, Number, Password } = req.body;
        const userImage = req.file.filename

        const user = await UserSchema.findOne({
            $or: [
                { UserName }, { Email }
            ]
        })

        if (user) {
            if(user.UserName == UserName){
                res.status(500).json("UserName Already Exist")
                return;
            }
            if(user.Email == Email){
                res.status(500).json("Email Already Exist")
                return;
            }
        }

        const newuserData = {
            FirstName,
            LastName,
            UserName,
            Email,
            Number,
            Password,
            userImage
        }
        const userdata = new UserSchema(newuserData);
        await userdata.save();
        res.status(200).json({ success: "true", message: "User Created Successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "User Not Created" })
    }

},
    (error, res) => {
        if (error) {
            res.status(500).json(error.message)
        }
    }
)



//PUT USER
router.put("/:id", upload.single("userimg"), async (req, res) => {
    try {
        const { FirstName, LastName, UserName, Email, Number, Password } = req.body;

        const newuserData = {
            FirstName,
            LastName,
            UserName,
            Email,
            Number,
            Password
        }
        if (req.file) {
            newuserData.userImage = req.file.filename

            const getuser = await UserSchema.findById(req.params.id)
            //deleting Image from the server
            const imgpath = `images/user/${getuser.userImage}`;
            fs.unlinkSync(imgpath)
        }

        const userupdated = await UserSchema.findByIdAndUpdate(req.params.id, {
            $set: newuserData
        }, { new: true })
        res.status(200).json({ success: true, message: "User updated Successfully" });

    } catch (err) {
        res.status(500).json({ success: false, message: "User Not Updated" });
    }

},
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message)
        }
    }
);

//USER Details
router.get("/:id", async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id)

        //Image delete from the Server
        

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
});



//DELETE USER
router.delete("/:id", async (req, res) => {
    try {
        const user = await UserSchema.findByIdAndDelete(req.params.id)

        //Image delete from the Server
        const imgpath = `images/user/${user.userImage}`
        fs.unlinkSync(imgpath)

        res.status(200).json("user Has Been Deleted")
    } catch (err) {
        res.status(500).json(err)
    }
});



//login
router.post("/login", async (req, res) => {
    try {
        const user = await UserSchema.findOne({
            UserName: req.body.UserName,
        })

        if (!user) {
            res.status(401).json({success:false,message:"Username Not Exist"})
            return;
        }

        // !user && res.status(401).json("Username Not Exist")

        if (user.Password !== req.body.Password) {
            res.status(401).json({success:false,message:"Password Not Exist"})
            // res.status(401).json("Password Doesn't Match")
            return;
        }

        //Creating Token
        if (user) {
            const token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SECRET_KEY,
                { expiresIn: "3d" })
            const { Password, ...others } = user._doc
            return res.status(200).json({ ...others, token })
        } else {
            return res.status(401).json({success:false,message:"Wrong Username or Password"})
        }
    } catch (err) {
        res.status(500).json(err)
    }
})


router.post("/mail/send",async(req,res)=>{
    try {
        const {email,message,subject} = req.body
        console.log(email,message,subject)
        //send Mail to the user
        mail(email,message,subject,"")
        res.status(200).json({success:true,message:"Message Sent Successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:"Message Not something Wrong Happen"})
    }
})


module.exports = router;

