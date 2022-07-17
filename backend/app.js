const express = require("express")
const bodyPareser = require("body-parser")
const cors = require('cors')
const passport = require('passport')
const morgan = require('morgan')
const session = require('express-session')
const {
    PythonShell
} = require('python-shell')

const instructorRouter = require("./routes/instructor-route")
const examineeRouter = require("./routes/examinee-route")
const authRouter = require("./routes/auth-route")
const questionBankRouter = require("./routes/questionBank-route")
const questionsRouter = require("./routes/questions-route")
const examRouter = require("./routes/exam-route")
const groupRouter = require('./routes/group-route')
const evaluationRouter = require('./routes/evaluation-route')


const app = express()

// PythonShell.run("./python/textToVoice.py", null, function (err, results) {

// })
app.use(bodyPareser.json())
app.use(bodyPareser.urlencoded({
    extended: true
}))
app.use((err, req, res, next) => {
    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just body-parser:

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.sendStatus(400); // Bad request
    }

    next();
});





app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors())


app.use('/instructor', instructorRouter)
app.use('/examinee', examineeRouter)
app.use('/auth', authRouter)
app.use('/questionBank', questionBankRouter)
app.use('/questions', questionsRouter)
app.use('/exam', examRouter)
app.use('/group', groupRouter)
app.use('/evaluation', evaluationRouter)


app.use((req, res, next) => {
    const error = new Error("Page not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        res.status(404).json({
            status: "error",
            msg: "Page not Found"
        })
    } else {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    }
})

module.exports = app