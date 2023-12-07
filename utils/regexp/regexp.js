const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

module.exports = {
  emailRegexp,
  passwordRegexp,
};
