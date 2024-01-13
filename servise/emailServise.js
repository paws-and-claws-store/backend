const nodemailer = require("nodemailer");
const { META_PASSWORD, BASE_URL, SENDGRID_API_KEY } = process.env;
const { nodemailerConfig } = require("../config");

const sgMail = require("@sendgrid/mail");

class EmailServise {
  constructor() {
    this.transporter = nodemailer.createTransport(nodemailerConfig);
    this.sendGrid = sgMail.setApiKey(SENDGRID_API_KEY);
  }

  async sendEmail(data) {
    try {
      if (data) {
        const resetPass = {
          from: "kardmitriy@gmail.com",
          to: data.email,
          subject: " Pawlaws",
          html: `<p>Відновлення парою</p>
    <a target='_blank' href="https://paws-and-claws-store.github.io/frontend/newpass?token=${data.resetPasswordToken}">Linl to reser</a>
    `,
        };

        await this.sendGrid.send(resetPass);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async sendActivateEmail(data) {
    const email = {
      from: "kardmitriy@gmail.com",
      to: data.email,
      subject: "Підтвердження реєстрації в Paws & Claws",
      html: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table td {
            border-collapse: collapse;
        }

        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        p {
            margin: 0;
        }

        table tr td {
            padding-bottom: 20px;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <table style="padding: 20px;" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <p>Привіт, <span style="color: orange;">${data.name}</span>!</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Дякуюємо за те що, обрали наш магазин для свого улюбленця.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Щоб завершити процес реєстрації в <span style="color: #B2AB73;">Paws & Claws</span>, перейдіть за цим
                    посиланням:</p>
            </td>
        </tr>
        <tr>
            <td>
                <a style='color: grey; ' target="_blank"
                    href="${BASE_URL}/api/auth/verify/${data.verificationCode}">Посилання на підтвердження
                    реєстрації</a>
            </td>
        </tr>
        <tr>
            <td>
                <p>Ваші реєстраційні дані</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Ім'я: <span>${data.name}</span></p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Email: <span>${data.email}</span></p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Приємних покупок!</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>З найкращими побажаннями</p>
            </td>
        </tr>
        <tr>
            <td>
                <table>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                                <tr>
                                    <td style="padding-right: 1em;">Команда</td>
                                    <td><img src="https://res.cloudinary.com/dtwrxerft/image/upload/v1704464171/Collar_ptvg34.png"
                                            width="40" style="display: block; margin: 0 auto;"></td>
                                    <td>
                                        <p style="margin: 0;">Paws & Claws</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>


</body>

</html>
`,
    };
    await this.sendGrid.send(email);
  }
}

module.exports = new EmailServise();
