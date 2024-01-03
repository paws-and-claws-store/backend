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
      from: "paws-and-claws-shop@meta.ua",
      to: data.email,
      subject: "Підтвердження реєстрації в Paws & Claws",
      html: `
<h2>Привіт, <span style="color: orange;">${data.name}</span>!</h2>

<p>Дякуюємо за те що, обрали наш магазин для свого улюбленця.</p>

<h3>Щоб завершити процес реєстрації в <span style="color: #B2AB73;">Paws & Claws</span>, перейдіть за цим посиланням:</h3>
<a style: 'color: grey' target="_blank" href="${BASE_URL}/api/auth/verify/${data.verificationCode}">Посилання на підтвердження реєстрації</a>

<p>Ваші реєстраційні дані</p>

<p>Ім'я: <span>${data.name}</span></p>
<p>Email: <span>${data.email}</span></p>

<h4>Приємних покупок!</h4>
<p>З найкращими побажаннями</p>
<p>команда</p>
  <img src="${BASE_URL}/Collar.png"/>
`,
    };
    await this.transporter.sendMail(email);
  }
}

module.exports = new EmailServise();
