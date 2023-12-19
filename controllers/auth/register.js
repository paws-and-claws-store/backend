const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const verificationCode = nanoid();

  const newUser = await User.create({ ...req.body, password: hashPassword, verificationCode });

  const payload = {
    id: newUser._id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "1m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });

  newUser.accessToken = accessToken;
  newUser.refreshToken = refreshToken;

  newUser.save();

  const verifyEmail = {
    to: email,
    subject: "Підтвердження реєстрації в Paws & Claws",
    html: `
<h2>Привіт <span style="color: orange;">${name}</span></h2>

<p>Дякуюємо за те що, обрали наш магазин для свого улюбленця</p>

<h3>Щоб завершити процес реєстрації в <span style="color: #79798f;">Paws & Claws</span> перейдіть за цим посиланням:</h3>
<a style: 'color: grey' target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Посилання на підтвердження реєстрації</a>

<p>Ваші реєстраційні дані</p>

<p>Ім'я: <span>${name}</span></p>
<p>Email: <span>${email}</span></p>

<h4>Приємних покупок!</h4>
<p>З найкращими побажаннями</p>
<p>команда</p>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    code: 201,
    data: {
      user: {
        name,
        email,
        accessToken,
        refreshToken,
      },
    },
  });
};

module.exports = register;
