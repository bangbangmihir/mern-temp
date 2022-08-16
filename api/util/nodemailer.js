const nodemailer = require("nodemailer")


const mail = async(email,message,subject,otp) =>{


    let transporter = nodemailer.createTransport({
        // for sending mail by using spacific mail
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "mail@digisidekick.com",
            pass: "one2three4five6",
        },
    });
    let info = await transporter.sendMail({
        from: '<noreply@temporary.com>', // sender address
        to: email, // list of receivers
        subject: subject,
        // plain text body
        html: `<b><p>${message}</p></b> ` +  otp, // html body
    });

    // if (info.messageId) {
    //     res.status(200).json("Email Sent")
    // } else {
    //     res.status(500).json("Email Not Sent")
    // }
}

module.exports = mail