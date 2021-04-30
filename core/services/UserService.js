const UserModel = require('../models/User');
const { getSignToken } = require('../middleware/authenticate');

let instance;

class UserService {
    constructor() {}
    static userInstance() {
        if (!instance) {
            instance = new UserService();
        }
        return instance;
    }

    async isUserNameTaken(userName, excludeUserId) {
        const user = await UserModel.findOne({
            userName,
            _id: { $ne: excludeUserId }
        });
        return !!user;
    }

    async registerUser({ userData }) {
        const isUserNameTaken = await this.isUserNameTaken(userData.userName);
        if (isUserNameTaken) {
            throw new Error('Email already taken');
        }
        const user = await UserModel.create(userData);
        return user ? this.getLoggedInUserObject(user) : '';
    }

    async userLogin({ userName, password }) {
        const user = await UserModel.findOne({ userName });
        let result = false;
        if (!user) {
            result = false;
        }

        let match = await user.isPasswordMatch(password);
        result = match;

        return result ? this.getLoggedInUserObject(user) : '';
    }

    getLoggedInUserObject(user) {
        let result = {};
        if (user) {
            result['token'] = getSignToken(user);
            result['_id'] = user._id || '';
            result['userName'] = user.userName || '';
        }
        return result;
    }
}

module.exports = UserService.userInstance();
