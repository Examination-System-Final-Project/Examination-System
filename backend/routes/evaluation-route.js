const evaluationRouter = require("express").Router()
const evaluationController = require('../controllers/evaluation-controller')


evaluationRouter.get('/evaluateExam', evaluationController.evaluateExam)
evaluationRouter.get('/getInstructorExams', evaluationController.getInstructorExams)
evaluationRouter.get('/getExamEvaluationStats', evaluationController.getExamEvaluationStats)
evaluationRouter.get('/getEachQuestionEvaluationStats', evaluationController.getEachQuestionEvaluationStats)
evaluationRouter.get('/getExamEvaluationStatsForEachExaminee', evaluationController.getExamEvaluationStatsForEachExaminee)
evaluationRouter.get('/getAllExamEvaluationStatsForExaminee', evaluationController.getAllExamEvaluationStatsForExaminee)



module.exports = evaluationRouter