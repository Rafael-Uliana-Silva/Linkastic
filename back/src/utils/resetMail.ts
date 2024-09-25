import nodeMailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodeMailer.createTransport( {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const enviarEmail = async (email: string, token: string) => {
  const resetUrl = `http://localhost:3005/resetPassword/${token}`

  const mailOptions = {
    from: "rafaelulianatestes@gmail.com",
    to: email,
    subject: "Redefinir senha",
    text: `Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: ${resetUrl}`,
    html: `<p>Você solicitou uma redefinição de senha. Clique no link abaixo para redefinir sua senha:</p><a href="${resetUrl}">${resetUrl}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de reset enviado com sucesso")
  } catch (err) {
      console.error("Houve um erro", err)
    }
};
