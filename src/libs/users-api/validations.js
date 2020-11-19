
const yup = require("yup");
const { email, password } = require("../utils/validations");

module.exports = {
    post_users: yup.object().shape({
        requestBody: yup.object().shape({
            email: email.required(),
            password: password.required(),
            first_name: yup.string().required().min(5),
            last_name: yup.string().required().min(5),
            birthday: yup.string().test("is-date", val => new Date(val) != "Invalid Date").required(),
            contract_id: yup.number().integer().positive()
        })
    }),
    post_users_unrestricted: yup.object().shape({
        requestBody: yup.object().shape({
            email: email.required(),
            password: password.required(),
            first_name: yup.string().required().min(5),
            last_name: yup.string().required().min(5),
            birthday: yup.string().test("is-date", val => !val || new Date(val) != "Invalid Date"),
            contract_id: yup.number().integer().positive(),
            isAdmin: yup.boolean().required(),
            isAdvertiser: yup.boolean().required(),
            isPremium: yup.boolean().required(),
            points: yup.number()
        })
    }),
    patch_users_unrestricted: yup.object().shape({
        requestBody: yup.object().shape({
            email: email,
            password: password,
            first_name: yup.string().min(5),
            last_name: yup.string().min(5),
            birthday: yup.string().test("is-date", val => !val || new Date(val) != "Invalid Date"),
            contract_id: yup.number().integer().positive(),
            isAdmin: yup.boolean(),
            isAdvertiser: yup.boolean(),
            isPremium: yup.boolean(),
            points: yup.number()
        })
    })
}