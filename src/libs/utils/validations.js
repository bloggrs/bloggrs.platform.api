
const yup = require("yup");

module.exports = {
    username: yup.string().string().min(4),
    password: yup.string().min(8),
}