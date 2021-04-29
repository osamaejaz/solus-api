class UserController {
    constructor() {

    }

    login(req, res) {
        res.send({ 
            description: 'User is logged in'
        });
    }

    getUserDetailsById(req, res) {
        res.send({ 
            description: 'User is logged in'
        });
    }
}

module.exports = UserController;