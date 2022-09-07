require('dotenv').config()
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"From M 👻" <minhnguyen11402@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `<h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên ________.com</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        
        <p>Nếu các thông tin trên là đúng, vui lòng nhấn vào đường dẫn bên dưới để xác nhận để hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
        <div>Xin chân thành cảm ơn!</div>`
    }
    if (dataSend.language === 'en') {
        result = `<h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked a medical appointment on ________.com</p>
        <p>Information to schedule an appointment:</p>
        <div><b>Schedule: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        
        <p>If the above information is correct, please click on the link below to confirm to complete the procedure to book an appointment.</p>
        <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
        <div>Best regards!</div>`
    }

    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `<h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã hoàn tất thủ tục đặt lịch khám bệnh thành công:</p>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong tệp đính kèm:</p>

        <div>Xin chân thành cảm ơn!</div>`
    }
    if (dataSend.language === 'en') {
        result = `<h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you have successfully completed the appointment booking procedure:</p>
        <p>Prescription/invoice information is sent in the attachment:</p>

        <div>Best regards!</div>`
    }

    return result;
}

let sendAttachment = (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"From M 👻" <minhnguyen11402@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend), // html body,
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imageBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            });

            resolve();
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}