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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            margin: 0;
            padding: 0;
            line-height: 100%;
        }

        table td {
            border-collapse: collapse;


        }

        table {
            border-collapse: collapse;

        }


        p {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;

        }



        img {
            outline: none;
            text-decoration: none;
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100% !important;
            margin: 0;
            padding: 0;
            display: block;
        }

        .icon-foot-td {
            padding-right: 10px;

        }

        .main-table {
            max-width: 600px;
            width: 100%;
        }





        .main-td {
            padding-left: 20px;
            padding-top: 20px;
            padding-bottom: 20px;
        }

        .main-info-td {
            padding-bottom: 12px;
        }

        .user-info-td {
            padding-bottom: 10px;
        }
    </style>
</head>

<body>
    <table style="width: 100%;" bgcolor="#F3ECDC" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <table class="main-table">
                    <tr>
                        <td style="padding-left: 20px; padding-top: 20px; padding-bottom: 20px;">
                            <table>
                                <tr>
                                    <td class="main-info-td">
                                        <p>Привіт, <span style="color: orange;">${data.name}</span>!</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-info-td">
                                        <p>Дякуємо за те що, обрали наш магазин для свого улюбленця.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-info-td">
                                        <p style="padding-bottom: 10px;">Щоб завершити процес реєстрації в <span
                                                style="color: #B2AB73;">Paws &
                                                Claws</span>,
                                            перейдіть за
                                        </p>
                                        <p>
                                            цим посиланням:
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-info-td">
                                        <a style="color: #0e1111;" target="_blank"
                                            href="${BASE_URL}/api/auth/verify/${data.verificationCode}">
                                            підтвердити реєстрацію</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-info-td">

                                        <p>Ваші реєстраційні дані</p>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="user-info-td">
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                                            <tr>

                                                <td class="icon-foot-td">
                                                    <img src="https://res.cloudinary.com/dtwrxerft/image/upload/v1705160188/Property_1_finish_wiouv8.png"
                                                        alt="icon-foot-1" width="25">
                                                </td>
                                                <td>
                                                    <p>Ім' я: <span>${data.name}</span></p>
                                                </td>

                                            </tr>
                                        </table>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="user-info-td">
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                                            <tr>
                                                <td class="icon-foot-td">
                                                    <img src="https://res.cloudinary.com/dtwrxerft/image/upload/v1705160188/Property_1_finish_wiouv8.png"
                                                        alt="icon-foot-2" width="25">
                                                </td>
                                                <td>
                                                    <p>Email: <span>${data.email}</span></p>
                                                </td>
                                            </tr>
                                        </table>

                                    </td>
                                </tr>
                                <tr>
                                    <td class="main-info-td">
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
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
                                            <tr>
                                                <td>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        style="margin:0; padding:0">
                                                        <tr>
                                                            <td style="padding-right: 1em;">Команда</td>
                                                            <td><img src="https://res.cloudinary.com/dtwrxerft/image/upload/v1704464171/Collar_ptvg34.png"
                                                                    width="40" style="display: block; margin: 0 auto;"
                                                                    alt="Logo">
                                                            </td>
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
