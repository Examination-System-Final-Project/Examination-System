const authRouter = require("express").Router()
const authController = require('../controllers/auth-controller')


authRouter.post('/examineeLogin', authController.examineeLogin)
authRouter.post('/instructorLogin', authController.instructorLogin)


module.exports = authRouter
