const questionsRouter = require("express").Router()

const questionsController = require("../controllers/questions-controller")

questionsRouter.post("/createQuestionMcq", questionsController.createQuestionMcq)
questionsRouter.get("/listQuestions", questionsController.listQuestions)
questionsRouter.put("/editQuestion", questionsController.editQuestion)
questionsRouter.delete("/deleteQuestion", questionsController.deleteQuestion)
questionsRouter.post("/createQuestionEssay", questionsController.createQuestionEssay)
questionsRouter.post("/createQuestionTF", questionsController.createQuestionTF)
questionsRouter.get("/listQuestionInfo", questionsController.listQuestionInfo)
questionsRouter.get("/listQuestionsInQuestionBankNotInExam", questionsController.listQuestionsInQuestionBankNotInExam)
module.exports = questionsRouter