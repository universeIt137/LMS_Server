const jwt = require("jsonwebtoken");
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

const isLogIn = (req,res,next)=>{
    try {
        let token = req.cookies.accessToken;
        if(!token){
            return res.status(401).json({
                status:"fail",
                msg : "Unauthorized user"
            });
        }
        let decode = jwt.verify(token,accessTokenKey);
        req.user = decode.user;
        if(!decode){
            return res.status(401).json({
                status:"fail",
                msg : "Invalid token please login"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            msg : error.toString()
        });
    }
}



module.exports = {isLogIn}