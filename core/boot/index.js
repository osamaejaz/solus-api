const Db = require('./db');

async function initialize(app) {
    await Db.connect(); 
}

module.exports = {
    init: initialize
}