const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('authentication');
    
    //check for existence of token
    if(!token) {
        return res.status(401).send('Access Denied');
    }

    //if token found then verify that token
    try {
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = verifiedToken;
        next();
    }catch (err) {
        res.status(400).send('Invalid token');
    }
}
