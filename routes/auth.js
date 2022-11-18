const express = require('express')
const routes = express.Router()
const { signUp,signIn, getAllUsers,updateUser} = require('../controller/auth')
//const {checkDuplicateUsernameAndEmail, checkRoles} = require('../middleware')

routes.post('/irai/api/v1/auth/signup',signUp)

routes.post('/irai/api/v1/auth/signin',signIn)
routes.get('/irai/api/v1/auth/getallUsers',getAllUsers)
routes.put('/irai/api/v1/auth/update',updateUser)

module.exports = {authRoutes : routes}