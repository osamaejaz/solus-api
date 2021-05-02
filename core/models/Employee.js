const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others']
    },
    maritalStatus: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    emailId: {
        type: String,
        // unique: true,
        required: true
    }
});

const Employee = mongoose.model('Employee', schema);

module.exports = Employee;
