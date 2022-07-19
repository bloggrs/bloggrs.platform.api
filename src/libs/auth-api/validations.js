const yup = require("yup");

const { username, password } = require("../utils/validations");

module.exports = {
    post_auth: yup.object().shape({
        requestBody: yup.object().shape({
            username: username.required(),
            password: password.required()
        }).required()
    })
}
