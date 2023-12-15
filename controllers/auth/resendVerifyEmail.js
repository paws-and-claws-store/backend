const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify) {
    throw HttpError(401, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `
<h2>Привіт <span style="color: orange;">${user.name}</span></h2>

<p>Дякуюємо за те що, обрали наш магазин для свого улюбленця</p>

<h3>Щоб завершити процес реєстрації в <span style="color: #79798f;">Paws & Claws</span> перейдіть за цим посиланням:</h3>
<a style: 'color: grey' target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Посилання на підтвердження реєстрації</a>

<p>Ваші реєстраційні дані</p>

<p>Ім'я: <span>${user.name}</span></p>
<p>Email: <span>${user.email}</span></p>

<h4>Приємних покупок!</h4>
<p>З найкращими побажаннями</p>
<p>команда</p>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
