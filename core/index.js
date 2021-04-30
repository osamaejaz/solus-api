const cors = require('cors');
const http = require('http');
const config = require('config');
const express = require('express');
const logger = require('../core/utils/logger');
const requestIp = require('request-ip');
const { authenticate } = require('./middleware/authenticate');
const Routes = require('./routes');
const MAX_BODY_SIZE = config.get('server.http_max_body_size');

async function setupServer(app) {
    server = http.createServer(app);

    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'up' });
    });
    /* Log Request IP and details */
    app.use(function (req, res, next) {
        const clientIp = requestIp.getClientIp(req);
        logger.info({
            description: `Incoming request from ${clientIp} for ${req.method} ${req.path}`
        });
        next();
    });

    app.use(
        cors({
            origin: function (origin, cb) {
                if (config.get('cors.allowLocal')) {
                    cb(null, true);
                } else {
                    logger.error({
                        description: 'CORS Error',
                        origin
                    });

                    app.use(function (err, req, res) {
                        res.status(403).json({
                            success: false,
                            statusCode: 'NOT_ALLOWED_BY_CORS',
                            message:
                                'You are not allowed to access this resource',
                            data: {}
                        });
                    });
                    cb(true, false);
                }
            }
        })
    );
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: MAX_BODY_SIZE }));

    // app.use(authenticate);
    Routes.init(app);

    server.listen(config.get('api.port'));
    server.timeout = config.get('server.timeout');
}

module.exports = {
    setupServer
};
