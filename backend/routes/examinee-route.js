const examineeRouter = require("express").Router()
const examineeController = require("../controllers/examinee-controller")
const bcrypt = require("bcrypt")
const db = require('../database')
const passport = require('passport')


examineeRouter.get('/selectExaminee', examineeController.selectExaminee)
examineeRouter.get('/listExamineeExams', examineeController.listExamineeExams)
examineeRouter.post("/addExaminee", examineeController.addExaminee)
examineeRouter.put("/editExaminee", examineeController.editExaminee)
examineeRouter.post("/storeExamineeAnswer", examineeController.storeExamineeAnswer)

module.exports = examineeRouter