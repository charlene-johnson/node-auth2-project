const jwt = require("jsonwebtoken")

function restrict() {
   
    const authError = {
        message: "You shall not pass!"
    }
    return async (req, res, next) => {
        try {
            const token = req.cookies.token
            if(!token) {
                return res.status(401).json(authError)
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json(authError)
                }
                req.token = decoded

                next()
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = restrict