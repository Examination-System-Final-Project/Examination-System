const db = require('../database')
const Joi = require('joi')
const {
    number,
    isError
} = require('joi')


exports.createQuestionBank = async (req, res) => {
    const QuestionBankName = req.body.QuestionBankName
    const QuestionBankDescription = req.body.QuestionBankDescription
    const instructorId = req.param('id')
    const schema = Joi.object().keys({
        QuestionBankName: Joi.string().min(3).required(),
        // QuestionBankDescription: Joi.string()
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }
    await db.conn.promise()
        .query(`INSERT INTO questionbank(QuestionBankName, Description, Instructor_ID)
        VALUES('${QuestionBankName}','${QuestionBankDescription}' ,'${instructorId}')`)
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




}
exports.deleteQuestionBank = async (req, res) => {
    const questionBankId = req.param('questionBank')
    await db.conn.promise().query(`
        DELETE FROM questionBank 
        WHERE QuestionBank_ID = '${questionBankId}'
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
exports.editQuestionBank = async (req, res) => {
    const QuestionBankName = req.body.QuestionBankName
    const questionBankId = req.param('questionBank')
    const schema = Joi.object().keys({
        QuestionBankName: Joi.string().min(3).required(),
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }
    await db.conn.promise()
        .query(`
        UPDATE questionBank
        SET QuestionBankName = '${QuestionBankName}'
        WHERE QuestionBank_ID = '${questionBankId}'
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
exports.listQuestionBanks = async (req, res) => {
    const id = req.param('id') || 1
    let isError = false
    let questionBanks
    try {
        await db.conn.promise().query(`SELECT * FROM questionbank WHERE Instructor_ID = ${id}`)
            .then(data => {
                questionBanks = data[0]
            })
        for (let i = 0; i < questionBanks.length; i++) {
            await db.conn.promise().query(`SELECT COUNT(*) as count FROM question WHERE QuestionBank_ID = ${questionBanks[i].QuestionBank_ID} `)
                .then(data => {
                    Object.assign(questionBanks[i], {
                        NumberOfQuestions: data[0][0].count
                    })

                })
        }
        console.log(questionBanks)
    } catch (error) {
        isError = true
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    }
    if (!isError) {
        res.status(200).json({
            questionBanks: questionBanks
        })
    }
}

exports.test = (req, res) => {
    res.send(req.user)
}