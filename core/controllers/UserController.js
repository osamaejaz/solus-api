const UserService = require('../services/UserService');
class UserController {
    constructor() {}

    async registerUser(req, res) {
        try {
            const { body } = req;
            const data = await UserService.registerUser({ userData: body });
            return res.status(200).json({
                data
            });
        } catch (error) {
            return res.status(400).json({
                error
            });
        }
    }

    async userLogin(req, res) {
        try {
            const { body } = req;
            const data = await UserService.userLogin(body);
            return res.status(200).json({
                data
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                error
            });
        }
    }

    getUserDetailsById(req, res) {
        return res.status(200).send({
            description: 'User is logged in'
        });
    }
}

module.exports = UserController;
