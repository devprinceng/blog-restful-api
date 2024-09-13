const { PORT, CONNECTION_URL, JWT_SECRET_KEY, EMAIL_SENDER, EMAIL_PASSWORD } =
  process.env;

module.exports = {
  port: PORT,
  connectionUrl: CONNECTION_URL,
  jwtSecretKey: JWT_SECRET_KEY,
  email_user: EMAIL_SENDER,
  email_pass: EMAIL_PASSWORD,
};
