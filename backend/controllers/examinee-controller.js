    const bcrypt = require("bcrypt")
    const {
        isError
    } = require("joi")
    const Joi = require('joi')
    const passport = require('passport')
    const db = require('../database')

    exports.selectExaminee = async (req, res) => {

        const id = req.param('examinee')
        const user = await db.conn.promise().query(`SELECT * FROM examinee WHERE Examinee_ID ='${id}'`)
            .then(user => {
                res.status(200).json(user[0][0])
            })
            .catch(error => {
                console.log(error);
                console.log("###########", id)
                res.status(500).json({

                    status: "error",
                    msg: "500 internal server error"
                })
            })

    }

    exports.addExaminee = async (req, res) => {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const password = req.body.password
        const organization_ID = req.body.organization_ID || 1
        const phoneNumber = req.body.phoneNumber
        const gender = req.body.gender
        const ExamieeCondition = req.body.ExamieeCondition

        const schema = Joi.object().keys({
            email: Joi.string().trim().email().required(),
            password: Joi.string().min(5),
            firstName: Joi.string(),
            lastName: Joi.string(),
            gender: Joi.string(),
            phoneNumber: Joi.string(),
            ExamieeCondition: Joi.string(),
        })
        const result = schema.validate(req.body)
        if (result.error) {
            return res.status('400').send(result.error.details[0].message)
        }
        const user = await db.conn.promise().query(`SELECT * FROM Examinee WHERE Email ='${email}'`)
        if (user[0].length > 0) {
            res.status(400).json({
                status: 'error',
                msg: 'email is already registered'
            })
        } else {

            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    console.log(err);
                }
                const hashedPassword = hash
                await db.conn.promise()
                    .query(`INSERT INTO Examinee(FirstName,LastName,Email,
        Password,PhoneNumber,Gender, Organization_ID, Examinee_condition)
        VALUES('${firstName}',
        '${lastName}','${email}','${hashedPassword}','${phoneNumber}',
        '${gender}', '${organization_ID}', '${ExamieeCondition}')`)
                    .then(data => {

                        res.status(201).json({
                            status: "ok",
                            msg: "Created"
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            status: "error",
                            msg: "500 Internal Server Error"
                        })
                    })

            })

        }
    }

    exports.editExaminee = async (req, res) => {
        const examineeId = req.param('examinee')
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const organization_ID = req.body.organization_ID || 1
        const phoneNumber = req.body.phoneNumber
        const gender = req.body.gender
        const examineeCondition = req.body.examineeCondition

        const schema = Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
            gender: Joi.string(),
            phoneNumber: Joi.string(),
            email: Joi.string(),
            examineeCondition: Joi.string(),
        })
        const result = schema.validate(req.body)
        if (result.error) {
            return res.status('400').send(result.error.details[0].message)
        }
        await db.conn.promise()
            .query(`
        UPDATE Examinee
        SET FirstName = '${firstName}', LastName = '${lastName}',
        PhoneNumber = '${phoneNumber}',Examinee_condition = '${examineeCondition}'
        WHERE Examinee_ID = ${examineeId}
        `)
            .then(data => {
                if (data[0].affectedRows != 0) {
                    res.status(200).json({
                        status: "ok",
                        msg: "Updated"
                    })
                } else {
                    res.status(404).json({
                        msg: "No Question Bank with that ID"
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

    exports.listExamineeExams = async (req, res) => {
        const examineeId = req.param('examinee')

        await db.conn.promise().query(`
    SELECT distinct examinee_ID, examinee_unique_exam.exam_ID, exam.ExamName,
    exam.Description, exam.Duration, exam.EndTime, exam.StartTime 
    FROM examinee_unique_exam 
    JOIN exam ON examinee_unique_exam.exam_ID = exam.Exam_ID
    WHERE examinee_ID = ${examineeId}
    `).then(data => {
            res.status(200).json({
                exams: data[0]
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
    }

    exports.storeExamineeAnswer = async (req, res) => {
        const examinee = req.param('examinee')
        const exam = req.param('exam')
        const question = req.param('question')
        const examineeAnswer = req.body.examineeAnswer
        let checkAnswerExists = false
        let isError = false
        console.log(examineeAnswer + " ay haga ")

        try {
            await db.conn.promise().query(`
    SELECT * FROM examinee_answer
    WHERE examinee_Examinee_ID = ${examinee} AND exam_Exam_ID = ${exam} AND
    question_Question_ID = ${question}
    `).then(data => {
                console.log('checked answer exists')
                if (data[0].length >= 1) {
                    checkAnswerExists = true
                }
            })
            if (checkAnswerExists) {
                await db.conn.promise().query(`
        DELETE FROM examinee_answer
        WHERE examinee_Examinee_ID = ${examinee} AND
        exam_Exam_ID = ${exam} AND
        question_Question_ID = ${question}
        `).then(async data => {
                    console.log('deleted answer')
                    await db.conn.promise().query(`
        INSERT INTO examinee_answer (examinee_Examinee_ID, exam_Exam_ID, question_Question_ID, examinee_answer)
        VALUES ('${examinee}','${exam}','${question}','${examineeAnswer}')
        `).then(data => {
                        console.log('inserted after deleted')
                    })
                })
            } else {
                await db.conn.promise().query(`
    INSERT INTO examinee_answer (examinee_Examinee_ID, exam_Exam_ID, question_Question_ID, examinee_answer)
    VALUES ('${examinee}','${exam}','${question}','${examineeAnswer}')
    `).then(data => {
                    console.log('inserted without deleting')
                })
            }
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
                msg: "Answer submitted sucessfully",
                status: "200"
            })
        }
    }

    exports.checkExamineeAttempts = async (req, res) => {
        examId = req.param('exam')
        examineeId = req.param('examinee')
        let examineeExam

        await db.conn.promise()
            .query(`
        SELECT * FROM examinee_has_exam
        WHERE exam_Exam_ID = ${examId} AND examinee_Examinee_ID = ${examineeId}
    `).then(data => {
                examineeExam = data[0]
            }).catch(error => {
                console.log(error)
                res.status(500).json({
                    status: "error",
                    msg: "500 internal server error"
                })
            })

        await db.conn.promise()
            .query(`
        SELECT * FROM exam
        WHERE exam_Exam_ID = ${examId} 
    `).then(data => {
                examData = data[0]
            }).catch(error => {
                console.log(error)
                res.status(500).json({
                    status: "error",
                    msg: "500 internal server error"
                })
            })

    }