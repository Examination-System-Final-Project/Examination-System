const db = require('../database')
const Joi = require('joi')
const {
    isError
} = require('joi')


exports.createQuestionMcq = async (req, res) => {
    const questionType = 'mcq'
    const questionDifficulty = req.body.questionDifficulty
    const questionTitle = req.body.questionTitle
    const questionWeight = req.body.questionWeight
    const answers = req.body.answers
    const correctAnswer = req.body.correctAnswer
    const QuestionBankId = req.param('questionBank')
    let isError = false

    const schema = Joi.object().keys({
        questionType: Joi.string().required(),
        questionDifficulty: Joi.string().required(),
        questionTitle: Joi.string().required(),
        questionWeight: Joi.string().required(),
        answers: Joi.array().required(),
        correctAnswer: Joi.required(),
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }
    const Answer_1 = answers[0]
    const Answer_2 = answers[1]
    const Answer_3 = answers[2]
    const Answer_4 = answers[3]
    const Answer_5 = answers[4]
    const Answer_6 = answers[5]
    let questionId
    try {
        await db.conn.promise()
            .query(`INSERT INTO question(QuestionType,QuestionDifficulty,
             QuestionTitle,QuestionWeight, Option_1, Option_2,Option_3,
              Option_4, Option_5, Option_6, CorrectAnswer, QuestionBank_ID)
            VALUES(?,
            ?,?,
            ?, ?, ?,
            ?, ?, ?, ?,
            ?, ?)
            `, [questionType,
                questionDifficulty, questionTitle,
                questionWeight, Answer_1, Answer_2,
                Answer_3, Answer_4, Answer_5, Answer_6,
                correctAnswer, QuestionBankId
            ])
        await db.conn.promise()
            .query(`
        SELECT LAST_INSERT_ID(Question_ID) as question_ID from question order by LAST_INSERT_ID(Question_ID) desc limit 1;
            `).then(data => {
                questionId = data[0][0].question_ID
                console.log(questionId)
            })
    } catch (error) {
        console.log(error);
        isError = true
        res.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    }
    if (!isError) {
        res.status(201).json({
            questionId: questionId,
            status: "ok",
            msg: "Created"
        })
    }

}

exports.editQuestion = async (req, res) => {
    const questionDifficulty = req.body.questionDifficulty
    const questionTitle = req.body.questionTitle
    const questionWeight = req.body.questionWeight
    const Answer_1 = req.body.Answer_1
    const Answer_2 = req.body.Answer_2
    const Answer_3 = req.body.Answer_3
    const Answer_4 = req.body.Answer_4
    const Answer_5 = req.body.Answer_5
    const Answer_6 = req.body.Answer_6
    const correctAnswer = req.body.correctAnswer
    const questionId = req.param('question')

    const schema = Joi.object().keys({
        questionDifficulty: Joi.string().required(),
        questionType: Joi.string().required(),
        questionTitle: Joi.string().required(),
        questionWeight: Joi.string().required(),
        Answer_1: Joi.string(),
        Answer_2: Joi.string(),
        Answer_3: Joi.string(),
        Answer_4: Joi.string(),
        Answer_5: Joi.string(),
        Answer_6: Joi.string(),
        correctAnswer: Joi.string().required(),
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }

    await db.conn.promise()
        .query(`
        UPDATE Question
        SET QuestionDifficulty = '${questionDifficulty}',
            QuestionTitle = '${questionTitle}',
            QuestionWeight = '${questionWeight}',
            Option_1 = '${Answer_1}',
            Option_2 = '${Answer_2}',
            Option_3 = '${Answer_3}',
            Option_4 = '${Answer_4}',
            Option_5 = '${Answer_5}',
            Option_6 = '${Answer_6}',
            correctAnswer = '${correctAnswer}'
        WHERE Question_ID = '${questionId}'
        `)
        .then(data => {
            if (data[0].affectedRows != 0) {
                console.log('inside IF')
                res.status(200).json({
                    msg: "ok updated",
                    status: "200"
                })
            } else {
                console.log('inside else')
                res.status(404).json({
                    msg: "No Question with that ID"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })

}

exports.createQuestionTF = async (req, res) => {
    const questionType = 'true or false'
    const questionDifficulty = req.body.questionDifficulty
    const questionTitle = req.body.questionTitle
    const questionWeight = req.body.questionWeight
    const Answer_1 = req.body.Answer_1
    const correctAnswer = req.body.correctAnswer
    const QuestionBankId = req.param('questionBank')
    let isError = false
    const schema = Joi.object().keys({
        questionDifficulty: Joi.string().required(),
        questionTitle: Joi.string().required(),
        questionWeight: Joi.string().required(),
        Answer_1: Joi.string().required(),
        correctAnswer: Joi.string().required(),
        questionType: Joi.string().required()
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }
    try {
        await db.conn.promise()
            .query(`INSERT INTO question(QuestionType,QuestionDifficulty,
                QuestionTitle,QuestionWeight, Option_1, CorrectAnswer, QuestionBank_ID)
               VALUES(?,
               ?,?,
               ?, ?, ?,
               ?)
               `, [questionType,
                questionDifficulty, questionTitle,
                questionWeight, Answer_1,
                correctAnswer, QuestionBankId
            ])
        await db.conn.promise()
            .query(`
        SELECT LAST_INSERT_ID(Question_ID) as question_ID from question order by LAST_INSERT_ID(Question_ID) desc limit 1;
            `).then(data => {
                questionId = data[0][0].question_ID
                console.log(questionId)
            })
    } catch (error) {
        console.log(error);
        isError = true
        res.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    }
    if (!isError) {
        res.status(201).json({
            questionId: questionId,
            status: "ok",
            msg: "Created"
        })
    }

}

exports.createQuestionEssay = async (req, res) => {
    const questionType = 'essay'
    const questionDifficulty = req.body.questionDifficulty
    const questionTitle = req.body.questionTitle
    const questionWeight = req.body.questionWeight
    const correctAnswer = req.body.correctAnswer
    const QuestionBankId = req.param('questionBank')
    let isError = false

    const schema = Joi.object().keys({
        questionType: Joi.string().required(),
        questionDifficulty: Joi.string().required(),
        questionTitle: Joi.string().required(),
        questionWeight: Joi.string().required(),
        correctAnswer: Joi.string().required(),
        questionType: Joi.string().required()
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }
    try {
        await db.conn.promise()
            .query(`INSERT INTO question(QuestionType,QuestionDifficulty,
                QuestionTitle,QuestionWeight, CorrectAnswer, QuestionBank_ID)
               VALUES(?,
               ?,?,

               ?, ?, ?)
               `,[questionType,
               questionDifficulty,questionTitle,
               questionWeight,
               correctAnswer,QuestionBankId])

        await db.conn.promise()
            .query(`
            SELECT LAST_INSERT_ID(Question_ID) as question_ID from question order by LAST_INSERT_ID(Question_ID) desc limit 1;
                `).then(data => {
                questionId = data[0][0].question_ID
                console.log(questionId)
            })
    } catch (error) {
        console.log(error);
        isError = true
        res.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    }
    if (!isError) {
        res.status(201).json({
            questionId: questionId,
            status: "ok",
            msg: "Created"
        })
    }

}

exports.deleteQuestion = async (req, res) => {
    const questionId = req.param('question')
    await db.conn.promise().query(`
    DELETE FROM question 
    WHERE Question_ID = '${questionId}'
    `)
        .then(data => {
            if (data[0].affectedRows != 0) {
                res.status(200).json({
                    status: "Ok",
                    msg: "Deleted"
                })
            } else {
                res.status(404).json({
                    status: "error",
                    msg: "No Question with this ID"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({

                status: "error",
                msg: "500 internal server error"
            })
        })
}

exports.listQuestions = async (req, res) => {
    const questionBankId = req.param('questionBank') || 1

    const questions = await db.conn.promise().query(`
    SELECT * FROM question
    WHERE QuestionBank_ID ='${questionBankId}'
    `)
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({

                status: "error",
                msg: "500 internal server error"
            })
        })
}
exports.listQuestionInfo = async (req, res) => {
    const questionId = req.param('question') || 1
    const questions = await db.conn.promise().query(`
    SELECT * FROM question
    WHERE Question_ID ='${questionId}'
    `)
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                status: "error",
                msg: "500 internal server error"
            })
        })
}

exports.listQuestionsInQuestionBankNotInExam = async (req, res) => {
    const examId = req.param('exam')
    const questionBankId = req.param('questionBank')
    let examQuestions
    let questionBankQuestions
    let newQuestionsList = []
    let IsQuestionInExam = false
    try {
        await db.conn.promise().query(`
    SELECT * FROM exam_has_question 
    JOIN question ON question.Question_ID = Question_Question_ID
    WHERE Exam_Exam_ID = ${examId}
    `).then(data => {
            examQuestions = data[0]
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: "error",
                msg: "500 internal server error"
            })
        })

        await db.conn.promise().query(`
    SELECT * FROM question
    WHERE QuestionBank_ID ='${questionBankId}'
    `)
            .then(data => {
                questionBankQuestions = data[0]
                // console.log(questionBankQuestions[1].Question_ID)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    status: "error",
                    msg: "500 internal server error"
                })
            })

        for (let i = 0; i < questionBankQuestions.length; i++) {
            IsQuestionInExam = false
            for (let j = 0; j < examQuestions.length; j++) {
                if (questionBankQuestions[i].Question_ID == examQuestions[j].Question_ID) {
                    console.log(`question ${questionBankQuestions[i].QuestionTitle} in exam`)
                    IsQuestionInExam = true
                }
            }
            if (!IsQuestionInExam) {
                console.log('inside !question in exam')
                newQuestionsList.push(questionBankQuestions[i])
            }
        }
        console.log(newQuestionsList)
    } catch {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    } finally {
        res.status(200).json({
            newQuestionsList: newQuestionsList
        })
    }
}