const Joi = require('joi')
const db = require("../database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.examineeLogin = (async (req, res) => {

  const email = req.body.email
  const password = req.body.password

  let user = await db.conn.promise().query(`
        SELECT * FROM examinee
         WHERE Email ='${email}'
         `)
  if (user[0].length == 0) {
    res.status(404).json({
      status: "404",
      msg: "Wrong credentials email"
    })
  } else {
    bcrypt.compare(password, user[0][0].Password, (error, result) => {
      if (error) {
        console.log(error)
      }
      if (!result) {
        res.status(404).send('wrong credentials pass')
      }
      if (result) {
        const token = jwt.sign({
          id: user[0][0].Examinee_ID,
          firstName: user[0][0].FirstName,
          lastName: user[0][0].LastName,
          email: user[0][0].Email,
          organizationId: user[0][0].Organization_ID,
          examineeCondition: user[0][0].Examinee_condition,
          phoneNumber : user[0][0].PhoneNumber
        }, `${process.env.TOKEN_SECRET}`, {
          expiresIn: '14d'
        })
        res.header('auth-token', token)
          .status(200)
          .json({
            token: token
          })

      }

    })
  }
})

exports.instructorLogin = (async (req, res) => {

  const email = req.body.email
  const password = req.body.password

  let user = await db.conn.promise().query(`
          SELECT * FROM instructor
           WHERE Email ='${email}'
           `)
  if (user[0].length == 0) {
    res.status(404).json({
      status: "404",
      msg: "Wrong credentials email"
    })
  } else {
    bcrypt.compare(password, user[0][0].Password, (error, result) => {
      if (error) {
        console.log(error)
      }
      if (!result) {
        // res.status(404).send('wrong credentials pass')
      }
      const token = jwt.sign({
        id: user[0][0].Instructor_ID,
        firstName: user[0][0].FirstName,
        lastName: user[0][0].LastName,
        email: user[0][0].Email,
        organizationId: user[0][0].Organization_ID,
      }, `${process.env.TOKEN_SECRET}`)
      res.header('auth-token', token).json({
        token: token
      })
    })
  }
})

exports.logout = ((req, res) => {

  req.session.destroy((err) => {
    res.clearCookie('connect.sid')
    res.sendStatus(200)

  })

})