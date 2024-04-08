// There are basically 2 requests coming, one is for "signIn" and other is for "signUp"
// In both the requests we need to validate "email" as well as "password"
// We can achieve this using a single middleware fxn for both the requests

const validateUserAuth = (req, res, next)=> {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: "Email or password missing in the request"
        })
    }
    next();
}

module.exports={
    validateUserAuth 
}