import nodemailer from 'nodemailer'

// // Create a test account or replace with real credentials.
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   // port: 587,
//   // secure: false, // true for 465, false for other ports
//   auth: {
//     user: "sunny.reliqeagle@gmail.com",
//     pass: "evwubrlohpprorqs",
//   },
// });

// // Wrap in an async IIFE so we can use await.
// async function sendMail(to, subject, text, html) {
//   const info = await transporter.sendMail({
//     from: 'sunny.reliqeagle@gmail.com',
//     to,
//     subject,
//     text, // plain‑text body
//     html // HTML body
//   });

//   console.log("Message sent:", info.messageId);
// };

// export { sendMail }


const transporter = nodemailer.createTransport({
  host: "128.169.178.68.host.secureserver.net",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;

// Wrap in an async IIFE so we can use await.
async function sendMail(to, subject, text, html) {
  const info = await transporter.sendMail({
    // from: process.env.EMAIL_USER,
    from: '"LL Leather Lovers" <info@llleatherlovers.com>',
    to,
    subject,
    text, // plain‑text body
    html // HTML body
  });

  console.log("Message sent:", info.messageId);
};

export { sendMail }