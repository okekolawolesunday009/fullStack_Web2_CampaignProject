const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD

})

const sendEmail = (to, subject, text) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text
    }

    transporter.sendEmail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error sending email', error);

        } else {
            console.log('Email sent: ' + info.process)
        }
    })
}
module.exports = sendEmail