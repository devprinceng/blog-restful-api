const nodemail = require("nodemailer");
const { email_user, email_pass } = require("../config/keys");
//send verification code functionality
const sendEMailVerification = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemail.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Use 465 for secure connections, 587 for non-secure connections
    secure: true, // Use SSL

    auth: {
      user: email_user,
      pass: email_pass,
    },
    tls: {
      rejectUnauthorized: false, // Skip certificate validation (development use)
    },
  });

  const message = {
    to: emailTo,
    subject,
    html: `
            <div>
                <h3>Use this below code to ${content}</h3>
                <p><strong>Code:</strong> ${code}</p>
            </div>
        `,
  };
  // Send email
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Verification code delivered to: %s", info.envelope.to[0]);
  });
};

module.exports = sendEMailVerification;
