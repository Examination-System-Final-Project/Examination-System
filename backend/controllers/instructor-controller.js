const bcrypt = require("bcrypt")
const db = require('../database')
const express = require("express")
const session = require('express-session')
const app = express()


//Add new Instructor
exports.addInstructor = async (req, res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const organization_ID = req.body.organization_ID
    const phoneNumber = req.body.phoneNumber
    const gender = req.body.gender

    if (!firstName || !lastName ||
        !gender || !phoneNumber || !email || !password || !organization_ID) {
        return res.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }
    const user = await db.conn.promise().query(`SELECT * FROM Instructor WHERE Email ='${email}'`)
    if (user[0].length > 0) {
        return res.status(400).json({
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
                .query(`INSERT INTO Instructor(FirstName,LastName,Email,
        Password,PhoneNumber,Gender, Organization_ID)
        VALUES('${firstName}',
        '${lastName}','${email}','${hashedPassword}','${phoneNumber}',
        '${gender}', '${organization_ID}')`)
                .then(data => {
                    console.log(req.session.user)
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

        });
    }
}

exports.listInstructorExams = async (req, res) => {
    const instructorId = req.param('instructor')

    await db.conn.promise().query(`
    SELECT * FROM exam 
    WHERE Instructor_ID = ${instructorId}
    `).then(data => {
        res.status(200).json({
            InstructorExams: data[0]
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    })
}