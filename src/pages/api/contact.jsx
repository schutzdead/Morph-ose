/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
    require('dotenv').config()
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        host: "mail.lucassoubry.fr",
        port: 465,
        secure: true,
        auth: {
          user: 'aufildespuys@lucassoubry.fr',
          pass: process.env.EMAIL_SECRET_KEY,
        },
      })
      const mailData = {
        from: 'no-reply@dev.fr',
        to: ['lucas.soubry@gmail.com', 'bellurdylan@gmail.com', 'aufildespuys@gmail.com'],
        subject: `AUFILDESPUYS - DEMANDE DE CONTACT`,
        html: 
        `<div>
            <p>Demande : ${req.body.email}</p>
            <p>Prénom : ${req.body.firstname}</p>
            <p>Nom : ${req.body.lastname}</p>
            <p>Téléphone : ${req.body.phone}</p>
            <p>Message : ${req.body.message}</p>
        </div>`
       }
      
    await new Promise((resolve, reject) => {
       transporter.sendMail(mailData, function (err, info) { 
        if (err) {
          console.error(err);
          reject(err);
        } else {
            resolve(info);
        }});
      });
    res.status(200)
    res.end()
  }