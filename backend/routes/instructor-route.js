const instructorRouter = require("express").Router()
const instructorController = require("../controllers/instructor-controller")
const bcrypt = require("bcrypt")
const db = require('../database')


instructorRouter.post("/addInstructor", instructorController.addInstructor)
instructorRouter.get("/listInstructorExams", instructorController.listInstructorExams)


module.exports = instructorRouter