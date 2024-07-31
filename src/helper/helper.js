const jwt = require("jsonwebtoken");

const parseUserToken = (req) => {
    try {
        const authValue = req.headers.authorization;
        const authToken = authValue?.split(' ')[1];
        const decodedData = jwt.verify(authToken, process.env.SECRETKEY);
        return decodedData?.data;
    } catch (e) {
        throw new Error();
    }
}

module.exports = {
    parseUserToken,
}