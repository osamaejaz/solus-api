const mongoose = require('mongoose');
const config = require('config');
const logger = require('../utils/logger');

async function connect() {
    const url = `mongodb://${config.get('db.host')}:${config.get(
        'db.port'
    )}/${config.get('db.name')}`;
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        logger.info({ description: 'Database connected Successfully '});
    } catch (error) {
        logger.error({ description: 'Database connection failed', error });
    }
    
}

module.exports = {
    connect
};
