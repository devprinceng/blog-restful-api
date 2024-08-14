const {PORT, CONNECTION_URL, JWT_SECRET_KEY} = process.env

module.exports = {
    port:PORT,
    connectionUrl:CONNECTION_URL,
    jwtSecretKey:JWT_SECRET_KEY,
}