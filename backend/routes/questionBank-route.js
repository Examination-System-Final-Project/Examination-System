const questionBankRouter = require("express").Router()
const questionBankController = require("../controllers/questionBank-controller")
const verify = require("../verifyToken")

questionBankRouter.post("/createQuestionBank", questionBankController.createQuestionBank)
questionBankRouter.get("/listQuestionBanks",questionBankController.listQuestionBanks)
questionBankRouter.delete("/deleteQuestionBank", questionBankController.deleteQuestionBank)
questionBankRouter.put("/editQuestionBank", questionBankController.editQuestionBank)
questionBankRouter.get("/test", verify.auth,questionBankController.test)

// questionBankRouter.post("/createQuestionBank",local.isAuthenticated , questionBankController.createQuestionBank)
// questionBankRouter.post("/createQuestion", local.isAuthenticated, questionBankController.createQuestion)
// questionBankRouter.get("/listQuestionBanks", local.isAuthenticated, questionBankController.listQuestionBanks)

module.exports = questionBankRouter