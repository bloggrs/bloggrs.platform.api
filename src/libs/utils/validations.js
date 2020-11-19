
const yup = require("yup");

module.exports = {
    email: yup.string().email(),
    password: yup.string().min(8),
}