
var nodemailer = require('nodemailer');
function sendEmail(reqBody, next) {
   var mailOptions= {}
    if(reqBody.attachments){
          mailOptions = {
            from: reqBody.from, // sender address
            to: reqBody.to, // list of receivers
            subject: reqBody.subject, // Subject line
            html: reqBody.html,// plain text body
            attachments: [
                {
                    path: reqBody.attachments
                }
            ]
        }; 
    } else {
         mailOptions = {
            from: "munquasim3@gmail.com", // sender address
            to: reqBody.email, // list of receivers
            subject: "otp", // Subject line
            html: "your 4 digit otp is  :"+reqBody.otp// plain text body
        }; 
    }
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "munquasim3@gmail.com",// sender address
            pass: '85431585'
        }
    });
    transporter.sendMail(mailOptions, (err, result) => {
        if (err) return next(err);
        return next(null, "sent mail successfully");
    });
}
exports.sendEmail = sendEmail;