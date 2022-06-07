import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "allzonetechcorp@gmail.com",
    pass: "allzonetech",
  },
});

export default async function sendMail(
  to: string,
  groupsName: string
): Promise<void> {
  var mailOptions = {
    from: "allzonetechcorp@gmail.com",
    to,
    subject: "You are added in the study group",
    text: `You are added in ${groupsName} study groups`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
