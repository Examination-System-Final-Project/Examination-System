const {
    isError
} = require('joi')
const db = require('../database')

exports.evaluateExam = async (req, res) => {
    const examId = req.param('exam')
    const examineeId = req.param('examinee')
    let instructorId
    let examineeName
    let examGrade
    let examineeTotalGrade = 0
    let totalCorrectAnswer = 0
    let totalIncorrectAnswers = 0
    let totalQuestions = 0
    let examName
    let examineeAnswersEvaluation
    let questionGrade
    let isError = false
    let examEvaluationStats

    try {
        await db.conn.promise().query(`
    SELECT * FROM 
    answer_evaluation JOIN exam_has_question
    ON exam_has_question.question_Question_ID = answer_evaluation.Question_Question_ID
    AND exam_has_question.Exam_Exam_ID = answer_evaluation.exam_Exam_ID
    WHERE exam_has_question.Exam_Exam_ID = ${examId} AND answer_evaluation.Examinee_Examinee_ID = ${examineeId} 
    `).then(data => {
            examineeAnswersEvaluation = data[0]
            totalQuestions = examineeAnswersEvaluation.length
            console.log(examineeAnswersEvaluation)
        })

        await db.conn.promise().query(`
    SELECT * FROM exam
    WHERE Exam_ID = ${examId}
    `).then(data => {
            examName = data[0][0].ExamName
            examGrade = data[0][0].grade
            instructorId = data[0][0].Instructor_ID
            console.log(examGrade)
        })

        await db.conn.promise().query(`
        SELECT * FROM examinee
        WHERE Examinee_ID = ${examineeId}
        `).then(data => {
            examineeName = `${data[0][0].FirstName} ${data[0][0].LastName}`
        })


        for (let i = 0; i < examineeAnswersEvaluation.length; i++) {
            if (examineeAnswersEvaluation[i].question_type == 'mcq' || examineeAnswersEvaluation[i].question_type == 'true or false') {
                console.log('mcq')
                if (examineeAnswersEvaluation[i].result == 'correct') {
                    totalCorrectAnswer += 1
                    examineeTotalGrade += parseInt(examineeAnswersEvaluation[i].Grade)
                    console.log(examineeTotalGrade)
                }
            } else if (examineeAnswersEvaluation[i].question_type == 'essay') {
                console.log('essay')
                if (examineeAnswersEvaluation[i].result >= 0.70) {
                    totalCorrectAnswer += 1
                    console.log(examineeAnswersEvaluation[i].result)
                    examineeTotalGrade += examineeAnswersEvaluation[i].Grade
                }
            }
        }

        console.log(examineeTotalGrade)

        totalIncorrectAnswers = totalQuestions - totalCorrectAnswer

        await db.conn.promise().query(`
        INSERT INTO exam_evaluation (exam_ID, examinee_ID, exam_grade, examinee_total_grade,
             total_exam_questions, total_correct_answers, total_wrong_answers,
              exam_name, examinee_grade, instructor_ID, examinee_name)
        VALUES('${examId}','${examineeId}','${examGrade}','${examineeTotalGrade}', 
        '${totalQuestions}', '${totalCorrectAnswer}', '${totalIncorrectAnswers}',
         '${examName}', '${examineeTotalGrade}', '${instructorId}', '${examineeName}')
        `)

    } catch (error) {
        isError = true
        console.log(error)
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    }
    if (!isError) {
        res.status(200).json({
            status: 200,
            msg: "Ok evaluated"
        })
    }






}

exports.getExamEvaluationStats = async (req, res) => {
    const examId = req.param('exam')
    const examineeId = req.param('examinee')

    await db.conn.promise().query(`
    SELECT * FROM exam_evaluation 
    WHERE exam_ID = ${examId} AND examinee_ID = ${examineeId}
    `).then(data => {
        res.status(200).json({
            examEvaluationStats: data[0]
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    })
}

exports.getAllExamEvaluationStatsForExaminee = async (req, res) => {
    const examineeId = req.param('examinee')

    await db.conn.promise().query(`
    SELECT * FROM exam_evaluation 
    WHERE examinee_ID = ${examineeId}
    `).then(data => {
        res.status(200).json({
            examEvaluationStats: data[0]
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    })
}

exports.getEachQuestionEvaluationStats = async (req, res) => {
    const examId = req.param('exam')
    const examineeId = req.param('examinee')
    let examineeAnswersEvaluation
    let isError = false
    let examEvaluationStats

    try {
        await db.conn.promise().query(`
    SELECT * FROM 
    answer_evaluation JOIN exam_has_question
    ON exam_has_question.question_Question_ID = answer_evaluation.Question_Question_ID
    AND exam_has_question.Exam_Exam_ID = answer_evaluation.exam_Exam_ID
    WHERE exam_has_question.Exam_Exam_ID = ${examId} AND answer_evaluation.Examinee_Examinee_ID = ${examineeId} 
    `).then(data => {
            examineeAnswersEvaluation = data[0]
        })

        await db.conn.promise().query(`
        SELECT * FROM exam_evaluation 
        WHERE exam_ID = ${examId} AND examinee_ID = ${examineeId}
        `).then(data => {
            examEvaluationStats = data[0]
        })
    } catch (error) {
        isError = true
        console.log(error)
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    }
    if (!isError) {
        res.status(200).json({
            examineeAnswersEvaluation: examineeAnswersEvaluation,
            examEvaluationStats: examEvaluationStats,
        })
    }
}

exports.getInstructorExams = async (req, res) => {
    const instructorId = req.param('instructor')
    let instructorExams
    let numberOfQuestions
    let examEvaluationData
    let numberOfExamineesExamined
    let isError = false
    try {
        await db.conn.promise().query(`
    SELECT * FROM exam WHERE Instructor_ID = ${instructorId}
        `).then(data => {
            instructorExams = data[0]
        })

        for (let i = 0; i < instructorExams.length; i++) {
            await db.conn.promise().query(`
        SELECT COUNT(Question_Question_ID) AS numberOfQuestions FROM exam_has_question WHERE Exam_Exam_ID = ${instructorExams[i].Exam_ID}
            `).then(data => {
                // console.log(data[0])
                numberOfQuestions = data[0][0].numberOfQuestions

                Object.assign(instructorExams[i], {
                    numberOfQuestions: numberOfQuestions
                })
            })

            await db.conn.promise().query(`
        SELECT COUNT(exam_ID) AS numberOfExamineesExamined FROM exam_evaluation WHERE exam_ID = ${instructorExams[i].Exam_ID}
            `).then(data => {
                // console.log(data[0])
                numberOfExamineesExamined = data[0][0].numberOfExamineesExamined

                Object.assign(instructorExams[i], {
                    numberOfExamineesExamined: numberOfExamineesExamined
                })
            })

        }

        console.log(instructorExams)

    } catch (error) {
        isError = true
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    }

    if (!isError) {
        res.status(200).json({
            instructorExams: instructorExams
        })
    }

}

exports.getExamEvaluationStatsForEachExaminee = async (req, res) => {
    const instructorId = req.param('instructor')
    const examId = req.param('exam')

    await db.conn.promise().query(`
    SELECT * FROM exam_evaluation 
    WHERE instructor_ID = ${instructorId} AND exam_ID = ${examId}
    `).then(data => {
        res.status(200).json({
            examEvaluationStats: data[0]
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    })
}