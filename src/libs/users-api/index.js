
const express = require("express");
const app = module.exports = express();

const { allowCrossDomain, validateRequest, jwtRequired, passUserFromJWT, adminRequired } = require("../../middlewares");

const { post_users, post_users_unrestricted, patch_users_unrestricted } = require("./validations");
const createToken = require("../utils/createToken");
const { 
    updateUser,
    deleteUser, 
    createUser, 
    createUserUnrestricted, 
    findAll 
} = require("./users-dal");

app.use(allowCrossDomain)

app.get("/users", [
    jwtRequired, passUserFromJWT, adminRequired
], async (req,res) => {
    let users = await findAll(); 
    return res.json({
        message: "success",
        code: 200,
        data: { users }
    })
})

app.delete("/users/:user_id", [
    jwtRequired, passUserFromJWT, adminRequired
], async (req,res) => {
    await deleteUser(req.params.user_id)
    return res.json({
        message: "success",
        code: 204
    })
})

app.patch("/users/:user_id", [
    jwtRequired, passUserFromJWT, adminRequired
], async (req,res) => {
    let user = await updateUser({
        pk: req.params.user_id,
        data: req.body
    })
    return res.json({
        message: "success",
        code: 200,
        data: { user }
    })
})

app.post("/users", validateRequest(post_users), async (req, res) => {
    let user = await createUser(req.body);
    return res.json({
        message: "success",
        code: 201,
        data: { user, token: createToken(user.id) }
    })
})

app.post("/users/unrestricted", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(post_users_unrestricted)
], async (req, res) => {
    let user = await createUserUnrestricted(req.body);
    return res.json({
        message: "success",
        code: 201,
        data: { user }
    })
})