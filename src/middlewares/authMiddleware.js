const jwt = require("jsonwebtoken");
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

const isLogIn = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        console.log(token);

        if (!token) {
            return res.status(401).json({
                status: "fail",
                msg: "Unauthorized, user not logged in"
            });
        }

        const decode = jwt.verify(token, accessTokenKey);

        if (!decode) {
            return res.status(401).json({
                status: "fail",
                msg: "Invalid token, please log in"
            });
        }

        req.user = decode.user;
        next();
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: error.message
        });
    }
};


const isLogOut = (req,res,next)=>{
    try {
        let accessToken = req.cookies.accessToken;
        if(accessToken){
            let decode = jwt.verify(accessToken,accessTokenKey);
            if(decode){
                return res.status(409).json({
                    status:"fail",
                    msg : "You have already login"
                })
            }else {
                return res.status(401).json({
                    status:"fail",
                    msg : "User token expired"
                });
            }
        }
        next()
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            msg : error.toString()
        });
    }
};

const isAdmin = (req,res,next)=>{
    try {
        let admin = req.user.isAdmin;
        if(!admin){
            return res.status(403).json({
                status:"fail",
                msg : "You have not permission"
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            msg : error.toString()
        })
    }
};


module.exports = {isLogIn,isLogOut,isAdmin};