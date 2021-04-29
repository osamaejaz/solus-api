const jwt = require('jsonwebtoken');
const config = require('config');

const authenticate = (req, res, next) => {
    const {
        headers: { authorization: authHeader }
    } = req;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, config.get('jwt.secret'), (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const getSignToken = async (user) => {
    const token = jwt.sign(user, config.get('jwt.secret'), {
        expiresIn: config.get('jwt.expiresIn')
    });

    return token;
};


module.exports = {
    authenticate,
    getSignToken
};
