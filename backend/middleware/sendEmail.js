import nodemailer from "nodemailer";

export const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: data.email,
      subject: data.subject,
      text: data.message,
      html: data.html || data.message,
    };

    await transporter.sendMail(mailOptions);
    return true;
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.log("❌ Email not sent:", error);
  }
};

// export const sendEmail = async (data) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       // host: "smtp.gmail.com",
//       host: process.env.R_SMTP_HOST,
//       port: process.env.R_SMTP_PORT,
//       secure: true,
//       service: process.env.R_SMTP_SERVICE,
//       // secure: false, // important
//       auth: {
//         user: process.env.R_SMTP_MAIL,
//         pass: process.env.R_SMTP_PASS,
//       },
//     });

//     transporter.verify((err, success) => {
//       if (err) {
//         console.log("SMTP Connection Error", err);
//       } else {
//         console.log("SMTP Server is ready");
//       }
//     });
//     const mailOptions = {
//       // from: process.env.USER,
//       from: process.env.R_SMTP_MAIL,
//       to: data.email,
//       subject: data.subject,
//       text: data.message,
//     };

//     await transporter.sendMail(mailOptions);

//     console.log("email sent sucessfully");
//   } catch (error) {
//     console.log(error, "email not sent");
//   }
// };
