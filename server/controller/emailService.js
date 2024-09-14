const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

const sendEmailWithAttachment = async (toEmail, filePath) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: toEmail,
    subject: 'Your Completed Bookings Bill',
    text: 'Please find attached your completed bookings bill.',
    attachments: [
      {
        filename: 'completed_bookings_bill.pdf',
        path: filePath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmailWithAttachment };
