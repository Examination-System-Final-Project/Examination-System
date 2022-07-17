const jwt = require("jsonwebtoken")

exports.auth = (req, res, next) => {
    const token = req.header('auth_token')
    if (!token) {
        return res.status(401).send('Acsess Denied')
    }

    try {
        const verified = jwt.verify(token, `${process.env.TOKEN_SECRET}`)
        req.user = verified
        console.log(req.user)
        next();
    } catch (error) {
        res.status(400).json({
            status: "400",
            msg: "Invalid Token"
        })
    }
}
