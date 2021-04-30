const path = require('path');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
    try {
        if (req.file) {
            const filePath = path.resolve(
                `${req.file.destination}/${req.file.filename}`
            );
            readFileFromLocal(filePath)
                .then((data) => {
                    req.fileData = data;
                    next();
                })
                .catch((error) => {
                    logger.error({
                        description: error.message,
                        error
                    });
                    return res.status(400).json({
                        success: false,
                        statusCode: 'EXCEL_PARSE_FAILED',
                        message: error.message
                    });
                });
        } else {
            req.fileData = [];
            next();
        }
    } catch (error) {
        throw new Error(error);
    }
};

const readFileFromLocal = (path) =>
    new Promise((resolve, reject) => {
        fs.readFile(path, function (err, content) {
            if (err) {
                reject(err);
            }
            const fileContent = readExcelToArray(content);
            resolve(fileContent);
        });
    });
