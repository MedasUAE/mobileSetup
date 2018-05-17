
var nodemailer = require('nodemailer');
function sendEmail(client, reqBody, next) {
    const mailOptions = {
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
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: reqBody.from,
            pass: '85431585'
        }
    });
    transporter.sendMail(mailOptions, (err, result) => {
        if (err) return next(err);
        return next(null, "sent mail successfully");
    });
}
exports.sendEmail = sendEmail;