const examRouter = require("express").Router()
const examController = require("../controllers/exam-controller")

examRouter.get("/listExamQuestionsForExaminee", examController.listExamQuestionsForExaminee)
examRouter.get("/generateQuestionsAudioFiles", examController.generateQuestionsAudioFiles)
examRouter.get("/generateUniqueExamForEachStudentindividually", examController.generateUniqueExamForEachStudentindividually)
examRouter.get("/generateUniqueExamForEachStudentInGroup", examController.generateUniqueExamForEachStudentInGroup)
examRouter.get("/evaluateExamineeAnswers", examController.evaluateExamineeAnswers)
examRouter.get("/listExamInfo", examController.listExamInfo)
examRouter.get("/listExamQuestions", examController.listExamQuestions)
examRouter.post("/assignQuestionToExam", examController.assignQuestionToExam)
examRouter.post("/setExamGradeManual", examController.setExamGradeManual)
examRouter.post("/editQuestionGrade", examController.editQuestionGrade)
examRouter.post("/createExam", examController.createExam)
examRouter.post("/examAutoCreation", examController.examAutoCreation)
examRouter.put("/editExam", examController.editExam)
examRouter.get("/listExamInfo", examController.listExamInfo)
examRouter.delete("/deleteExam", examController.deleteExam)
examRouter.delete("/removeQuestionFromExam", examController.removeQuestionFromExam)
examRouter.delete("/deleteUniqueExam", examController.deleteUniqueExam)
examRouter.delete("/deleteUniqueExamForEachStudentInGroup", examController.deleteUniqueExamForEachStudentInGroup)
examRouter.delete("/removeQuestionFromExam", examController.removeQuestionFromExam)


module.exports = examRouter