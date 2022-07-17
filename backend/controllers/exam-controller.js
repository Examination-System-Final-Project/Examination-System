const db = require('../database')
const Joi = require('joi')
const {
    spawn
} = require('child_process')


exports.createExam = async (req, res) => {
    const examName = req.body.examName
    const duration = req.body.duration
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const description = req.body.description
    const numberOfAttempts = req.body.numberOfAttempts
    const instructorId = req.param('instructor')
    const organizationId = req.param('organization')

    const schema = Joi.object().keys({
        examName: Joi.string().min(3).required(),
        duration: Joi.date(),
        startTime: Joi.date(),
        endTime: Joi.date(),
        description: Joi.string(),
        numberOfAttempts: Joi.number()
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }
    await db.conn.promise()
        .query(`
        INSERT INTO exam(ExamName, Duration, StartTime,
            EndTime, Description, Organization_ID, Instructor_ID, Number_Of_Attempts_Allowed)
        VALUES('${examName}','${duration}' ,'${startTime}',
                '${endTime}', '${description}',
                 '${organizationId}', '${instructorId}', '${numberOfAttempts}')
                 `)
        .then(data => {
            console.log(data[0].insertId)
            res.status(200).json(data[0])
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.setExamGradeManual = async (req, res) => {
    const grade = req.body.grade
    const examId = req.param('exam')

    await db.conn.promise().query(`
    UPDATE exam SET grade = ${grade}
    WHERE Exam_ID = ${examId}
    `).then(data => {
            console.log(data[0].insertId)
            res.status(200).json({
                status: "ok",
                msg: "exam grade assigned"
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.editExam = async (req, res) => {
    const examName = req.body.examName
    const duration = req.body.duration
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const description = req.body.description
    const examId = req.param('exam')
    const schema = Joi.object().keys({
        examName: Joi.string().min(3).required(),
        duration: Joi.date(),
        startTime: Joi.date(),
        endTime: Joi.date(),
        description: Joi.string()
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }
    await db.conn.promise()
        .query(`
        UPDATE Exam
        SET ExamName = '${examName}', Duration = '${duration}',
        StartTime = '${startTime}',EndTime = '${endTime}',
        Description = '${description}'
        WHERE Exam_ID = '${examId}'
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

exports.listExamInfo = async (req, res) => {
    const examId = req.param('exam')

    db.conn.promise().query(`
    SELECT ExamName, Duration, StartTime, EndTime, Description
    FROM exam
    WHERE Exam_ID = ${examId}
    `).then(data => {
        res.status(200).json({
            examInfo: data[0]
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    })
}

exports.listExamQuestions = async (req, res) => {
    const examId = req.param('exam')

    await db.conn.promise().query(`
    SELECT * FROM exam_has_question 
    JOIN question ON question.Question_ID = Question_Question_ID
    WHERE Exam_Exam_ID = ${examId}
    `).then(data => {
        res.status(200).json({
            questions: data[0]
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    })
}

exports.removeQuestionFromExam = async (req, res) => {
    const examId = req.param('exam')
    const questionId = req.param('question')

    await db.conn.promise().query(`
    DELETE FROM exam_has_question
    WHERE Exam_Exam_ID = ${examId} AND Question_Question_ID = ${questionId}
    `).then(data => {
            if (data[0].affectedRows != 0) {
                res.status(200).json({
                    status: "Ok",
                    msg: "Deleted"
                })
            } else {
                res.status(404).json({
                    status: "error",
                    msg: "No Question in this exam with this ID"
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

exports.editQuestionGrade = async (req, res) => {
    const examId = req.param('exam')
    const questionId = req.param('question')
    const grade = req.body.grade

    await db.conn.promise().query(`
    UPDATE exam_has_question SET Grade = '${grade}'
    WHERE Exam_Exam_ID = ${examId} AND Question_Question_ID = ${questionId}
    `).then(data => {
            if (data[0].affectedRows != 0) {
                res.status(200).json({
                    status: "ok",
                    msg: "Updated"
                })
            } else {
                res.status(404).json({
                    msg: "No exam or question with that ID"
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

exports.deleteExam = async (req, res) => {
    const examId = req.param('exam')
    await db.conn.promise().query(`
        DELETE FROM exam 
        WHERE Exam_ID = '${examId}'
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
                    msg: "No Question Bank with this ID"
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

exports.assignQuestionToExam = async (req, res) => {
    const questionId = req.param('question')
    const examId = req.param('exam')
    const questionGrade = req.body.questionGrade

    await db.conn.promise()
        .query(`
        INSERT INTO exam_has_question(Exam_Exam_ID, Question_Question_ID, Grade)
        VALUES('${examId}','${questionId}', '${questionGrade}')
                 `)
        .then(data => {
            res.status(201).json({
                status: "ok",
                msg: "Assigned",
                questionGrade: questionGrade
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })

}

exports.removeQuestionFromExam = async (req, res) => {
    const questionId = req.param('question')
    const examId = req.param('exam')

    await db.conn.promise()
        .query(`
        DELETE FROM exam_has_question WHERE Exam_Exam_ID =${examId} 
        AND Question_Question_ID = ${questionId}
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
                    msg: "No Question or Exam with this ID"
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

exports.examAutoCreation = async (req, res) => {

    const arrayOfQuestionBanks = req.body.arrayOfQuestionBanks
    const mark = req.body.mark
    let questionGrade
    let examQuestions = []
    let isError = false
    const examId = req.param('exam')


    console.log(arrayOfQuestionBanks)

    const schema = Joi.object().keys({
        mark: Joi.number().required(),
        arrayOfQuestionBanks: Joi.array()
    })
    const result = schema.validate(req.body)
    if (result.error) {
        res.status('400').send(result.error.details[0].message)
    }
    try {
        let questionBankQuery = ''
        for (let i = 0; i < arrayOfQuestionBanks.length; i++) {
            if (i + 1 != arrayOfQuestionBanks.length) {
                questionBankQuery += `(SELECT * FROM Question WHERE QuestionBank_ID = ${arrayOfQuestionBanks[i].QuesionBankId} LIMIT ${arrayOfQuestionBanks[i].NumberOfQuestions})
                UNION
                `
                console.log('inside if', i)
            } else {
                questionBankQuery += `(SELECT * FROM Question WHERE QuestionBank_ID = ${arrayOfQuestionBanks[i].QuesionBankId}  LIMIT ${arrayOfQuestionBanks[i].NumberOfQuestions});`
                console.log('inside else')
            }
        }
        console.log(questionBankQuery)

        const exam = await db.conn.promise()
            .query(`
        ${questionBankQuery}
        `).then(data => {
                console.log(data[0].length)
                examQuestions = data[0]
            })
        questionGrade = mark / examQuestions.length
        for (let i = 0; i < examQuestions.length; i++) {
            await db.conn.promise()
                .query(`
            INSERT INTO exam_has_question(Exam_Exam_ID, Question_Question_ID, Grade)
            VALUES('${examId}','${examQuestions[i].Question_ID}', '${questionGrade}')
                     `)
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
            msg: "exam created automatically",
            status: "ok"
        })
    }

}

exports.listExamQuestionsForExaminee = async (req, res) => {
    examId = req.param('exam')
    examineeId = req.param('examinee')


    exam = await db.conn.promise()
        .query(`
        SELECT * FROM examinee_unique_exam
        JOIN Question ON examinee_unique_exam.question_ID = Question.Question_ID
        WHERE exam_ID = ${examId} AND examinee_ID = ${examineeId}
        ORDER BY random
    `).then(data => {
            res.status(200).json({
                examQuestion: data[0]
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: "error",
                msg: "500 internal server error"
            })
        })
}

exports.storeExamineeAnswer = async (req, res) => {
    const examinee = req.param('examinee')
    const exam = req.param('exam')
    const question = req.param('question')
    const examineeAnswer = req.body.examineeAnswer
    let checkAnswerExists = false

    await db.conn.promise().query(`
    SELECT * FROM Examinee_Answer
    WHERE Examinee_ID = ${examinee} AND Exam_ID = ${exam} AND
    Question_ID = ${question}
    `).then(data => {
        console.log('checked answer exists')
        if (data[0].length >= 1) {
            checkAnswerExists = true
        }
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    })

    if (checkAnswerExists) {
        await db.conn.promise().query(`
        DELETE FROM Examinee_Answer
        WHERE Examinee_ID = ${examinee} AND
        Exam_ID = ${exam} AND
        Question_ID = ${question}
        `).then(async data => {
            console.log('deleted answer')
            await db.conn.promise().query(`
        INSERT INTO Examinee_Answer (Examinee_ID, Exam_ID, Question_ID, Examinee_Answer)
        VALUES ('${examinee}','${exam}','${question}','${examineeAnswer}')
        `).then(data => {
                console.log('inserted after deleted')
                res.status(200).json({
                    msg: "Answer submitted sucessfully",
                    status: "200"
                })
            }).catch(error => {
                console.log(error)
                res.status(500).json({
                    status: "error",
                    msg: "500 internal server error"
                })
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: "error",
                msg: "500 internal server error"
            })
        })
    } else {
        await db.conn.promise().query(`
    INSERT INTO Examinee_Answer (Examinee_ID, Exam_ID, Question_ID, Examinee_Answer)
    VALUES ('${examinee}','${exam}','${question}','${examineeAnswer}')
    `).then(data => {
            console.log('inserted without deleting')
            res.status(200).json({
                msg: "Answer submitted sucessfully",
                status: "200"
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: "error",
                msg: "500 internal server error"
            })
        })
    }
}

exports.generateQuestionsAudioFiles = async (req, res) => {
    const questionId = req.param('question')
    let isError = false
    console.log('###########', questionId)
    let ID = questionId
    try {
        const childPython = spawn('python3', ['./python/textToVoiceAPI.py',
            ID,
        ], {
            shell: true
        })

        childPython.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`)
        })
        childPython.stderr.on('data', data => {
            isError = true
            console.error(`stderr: ${data}`)
        })
        await new Promise((resolve) => {
            childPython.on('close', resolve)
        })
        if (!isError) {
            console.log(isError)
            res.status(200).json({
                msg: "question audio file generated",
                status: "200"
            })
        } else {
            res.status(500).json({
                status: "500",
                error: "internal server error"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "500",
            error: "internal server error"
        })
    }

}

exports.generateUniqueExamForEachStudentindividually = async (req, res) => {
    const examineeId = req.param('examinee')
    const examId = req.param('exam')
    // questionId = req.param('question')

    let questions
    let randomValue
    let errorFlag = false
    let isRecordExists = false
    await db.conn.promise().query(`
    SELECT * FROM exam_has_question
    JOIN question ON exam_has_question.Question_Question_ID = Question.Question_ID
    WHERE Exam_Exam_ID = ${examId}
    `).then(data => {
        questions = data[0]
    }).catch(error => {
        errorFlag = true
        console.log(error)
        res.status(500).json({
            status: "500",
            error: "internal server error"
        })
    })
    try {
        for (let i = 0; i < questions.length; i++) {
            randomValue = Math.floor(Math.random() * 10)

            await db.conn.promise().query(`
            SELECT * FROM examinee_unique_exam
            WHERE exam_ID = ${examId} AND examinee_ID = ${examineeId} AND question_ID = ${questions[i].Question_ID}
        `).then(data => {
                if (data[0].length > 0) {
                    isRecordExists = true
                    console.log(`record exists with examinee id ${examineeId} exam id ${examId} question id${questions[i].Question_ID}`)
                }
            }).catch(error => {
                errorFlag = true
                console.log(error)
                res.status(500).json({
                    status: "500",
                    error: "internal server error"
                })
            })
            if (!isRecordExists) {
                await db.conn.promise().query(`
                INSERT INTO examinee_unique_exam(exam_ID, examinee_ID, question_ID, random)
                VALUES ('${examId}','${examineeId}','${questions[i].Question_ID}','${randomValue}')
        `)
            }

        }
    } catch (error) {
        errorFlag = true
        console.log(error)
        res.status(500).json({
            status: "500",
            error: "internal server error"
        })
    }
    if (!errorFlag)
        res.status(200).json({
            status: "200",
            msg: "generated an unique exam for an examinee"
        })
}

// exports.generateUniqueExamForEachStudentInGroup = async (req, res) => {
//     const examId = req.param('exam')
//     const groupId = req.param('group')

//     let questions
//     let examinees
//     let randomValueForQuestion
//     let errorFlag = false
//     let isRecordExists = false


//     await db.conn.promise().query(`
//     SELECT * FROM Exam_has_Question
//     JOIN Question ON Exam_has_Question.Question_Question_ID = Question.Question_ID
//     WHERE Exam_Exam_ID = ${examId}
//     `).then(data => {
//         questions = data[0]
//     }).catch(error => {
//         errorFlag = true
//         console.log(error)
//         res.status(500).json({
//             status: "500",
//             error: "internal server error"
//         })
//     })
//     await db.conn.promise().query(`
//     SELECT * FROM examinee_has_group_
//     JOIN examinee ON examinee_has_group_.examinee_Examinee_ID = Examinee_ID
//     WHERE group__Group_ID = ${groupId}
//     `).then(data => {
//         examinees = data[0]
//     }).catch(error => {
//         errorFlag = true
//         console.log(error)
//         res.status(500).json({
//             status: "500",
//             error: "internal server error"
//         })
//     })
//     try {
//         for (let j = 0; j < examinees.length; j++) {
//             for (let i = 0; i < questions.length; i++) {
//                 randomValueForQuestion = Math.floor(Math.random() * 10)

//                 await db.conn.promise().query(`
//                 SELECT * FROM examinee_unique_exam
//                 WHERE exam_ID = ${examId} AND examinee_ID = ${examinees[j].Examinee_ID} AND question_ID = ${questions[i].Question_ID}
//             `).then(data => {
//                     if (data[0].length > 0) {
//                         isRecordExists = true
//                         console.log(`record exists with examinee id ${examinees[j].Examinee_ID} exam id ${examId} question id${questions[i].Question_ID}`)
//                     }
//                 }).catch(error => {
//                     errorFlag = true
//                     console.log(error)
//                     res.status(500).json({
//                         status: "500",
//                         error: "internal server error"
//                     })
//                 })
//                 if (!isRecordExists) {
//                     await db.conn.promise().query(`
//                     INSERT INTO examinee_unique_exam(exam_ID, examinee_ID, question_ID, random)
//                     VALUES ('${examId}','${examinees[j].Examinee_ID}','${questions[i].Question_ID}','${randomValue}')
//                 `)
//                 }

//             }

//         }
//     } catch (error) {
//         errorFlag = true
//         console.log(error)
//         res.status(500).json({
//             status: "500",
//             error: "internal server error"
//         })
//     }
//     if (!errorFlag)
//         res.status(200).json({
//             status: "200",
//             msg: "generated an unique exam for an examinee"
//         })
// }

exports.generateUniqueExamForEachStudentInGroup = async (req, res) => {

    // console.log(repeat('x', 15), 'in')
    //Intialization
    const examId = req.param('exam')
    const groupId = req.param('group')

    let questions
    let examinees
    let randomValueForQuestion
    // let numberOfAttempts = req.body.numberOfAttempts
    // let ExamieeCondition = req.body.ExamieeCondition
    let errorFlag = false
    let isRecordExists = false
    let examineeHasRecord = false


    //Get questions inside specific exam and store them in questions array
    let getExamQuestions = async (examId) => {
        await db.conn.promise().query(`
        SELECT * FROM exam_has_question
        JOIN question ON exam_has_question.question_question_ID = question.question_ID
        WHERE Exam_Exam_ID = ${examId}
    `).then(data => {
            questions = data[0]
        })
    }
    //Get examinees inside specific group and store in examinees array
    let getGroupExaminees = async (groupId) => {
        await db.conn.promise().query(`
        SELECT * FROM examinee_has_group_
        JOIN examinee ON examinee_has_group_.examinee_Examinee_ID = Examinee_ID
        WHERE group__Group_ID = ${groupId}
    `).then(data => {
            examinees = data[0]
        })
    }
    //Check if the examinee has already a unique exam of this exam
    let checkRecordExsistsInDb = async (i, j) => {
        await db.conn.promise().query(`
            SELECT * FROM examinee_unique_exam
            WHERE exam_ID = ${examId} AND examinee_ID = ${examinees[i].Examinee_ID} AND question_ID = ${questions[j].Question_ID}
            `).then(data => {
            if (data[0].length > 0) {
                isRecordExists = true
                console.log(`record exists with examinee id ${examinees[i].Examinee_ID} exam id ${examId} question id${questions[j].Question_ID}`)
            } else {
                isRecordExists = false
            }
        })
    }
    //Add new record for each question in table 
    let addNewRecordInDb = async (i, j, randomValueForQuestion) => {
        await db.conn.promise().query(`
                    INSERT INTO examinee_unique_exam(exam_ID, examinee_ID, question_ID, random)
                    VALUES ('${examId}','${examinees[i].Examinee_ID}','${questions[j].Question_ID}','${randomValueForQuestion}')
                `)
    }
    //Check errorFlag to prevent Cannot set headers after they are sent to the client error and then send 200 Ok status
    let returnOkStatus = async (errorFlag) => {
        if (!errorFlag)
            res.status(200).json({
                status: "200",
                msg: "generated an unique exam for a group"
            })
    }
    //assign exam to student
    let assignExamToStudent = async (i) => {
        examineeHasRecord = false
        await db.conn.promise().query(`
        SELECT * FROM examinee_has_exam 
        WHERE exam_Exam_ID = ${examId} AND examinee_Examinee_ID = ${examinees[i].Examinee_ID}
    `).then(data => {
            if (data[0].length > 0) {
                examineeHasRecord = true
            }
        })
        if (!examineeHasRecord) {
            await db.conn.promise().query(`
        INSERT INTO examinee_has_exam(exam_Exam_ID, examinee_Examinee_ID)
        VALUES ('${examId}','${examinees[i].Examinee_ID}')
    `)
        }

    }

    try {
        await getExamQuestions(examId)
        await getGroupExaminees(groupId)
        for (let i = 0; i < examinees.length; i++) {
            await assignExamToStudent(i)
            for (let j = 0; j < questions.length; j++) {
                randomValueForQuestion = Math.floor(Math.random() * 10)
                await checkRecordExsistsInDb(i, j)
                if (!isRecordExists) {
                    await addNewRecordInDb(i, j, randomValueForQuestion)
                }
            }
        }
    } catch (error) {
        errorFlag = true
        console.log(error)
        res.status(500).json({
            status: "500",
            error: "internal server error"
        })
    }
    returnOkStatus(errorFlag)


}

exports.deleteUniqueExamForEachStudentInGroup = async (req, res) => {

    //Intialization
    const examId = req.param('exam')
    const groupId = req.param('group')

    let examinees
    let errorFlag = false

    //Get examinees inside specific group and store in examinees array
    let getGroupExaminees = async (groupId) => {
        await db.conn.promise().query(`
        SELECT * FROM examinee_has_group_
        JOIN examinee ON examinee_has_group_.examinee_Examinee_ID = Examinee_ID
        WHERE group__Group_ID = ${groupId}
    `).then(data => {
            examinees = data[0]
        })
    }
    //Add new record for each question in table 
    let deleteUniqueExamQuestionsAssignedToExaminee = async (i) => {
        await db.conn.promise().query(`
                    DELETE FROM examinee_unique_exam
                    WHERE exam_ID = ${examId} AND examinee_ID = ${examinees[i].Examinee_ID}
                `)
    }
    //Check errorFlag to prevent Cannot set headers after they are sent to the client error and then send 200 Ok status
    let returnOkStatus = async (errorFlag) => {
        if (!errorFlag)
            res.status(200).json({
                status: "200",
                msg: "ok deleted"
            })
    }

    try {
        await getGroupExaminees(groupId)
        for (let i = 0; i < examinees.length; i++) {
            await deleteUniqueExamQuestionsAssignedToExaminee(i)
        }
    } catch (error) {
        errorFlag = true
        console.log(error)
        res.status(500).json({
            status: "500",
            error: "internal server error"
        })
    }
    returnOkStatus(errorFlag)


}

exports.deleteUniqueExam = async (req, res) => {
    const examId = req.param('exam')

    await db.conn.promise().query(`
    DELETE FROM examinee_unique_exam
    WHERE exam_ID = ${examId}
    `).then(data => {
            if (data[0].affectedRows != 0) {
                res.status(200).json({
                    status: "Ok",
                    msg: "deleted"
                })
            } else {
                res.status(404).json({
                    status: "error",
                    msg: "No Exam with this ID"
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

exports.evaluateExamineeAnswers = async (req, res) => {
    const examId = req.param('exam')
    const examineeId = req.param('examinee')

    let isError = false

    try {
        const childPython = spawn('python3', ['./python/evaluation.py',
            examId,
            examineeId
        ], {
            shell: true
        })

        childPython.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`)
        })
        childPython.stderr.on('data', data => {
            isError = true
            console.log('isidestderr', isError)
            console.error(`stderr: ${data}`)
        })
        await new Promise((resolve) => {
            childPython.on('close', resolve)
        })
        if (!isError) {
            console.log(isError)
            res.status(200).json({
                msg: "exam corrected",
                status: "200"
            })
        } else {
            res.status(500).json({
                status: "500",
                error: "internal server error"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "500",
            error: "internal server error"
        })
    }
}