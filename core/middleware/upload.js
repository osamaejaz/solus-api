const multer = require('multer');
const logger = require('../utils/logger');

module.exports = (fieldName, type) => {
    try {
        let destination = '';
        switch (type) {
            case 'excel':
                dest = `temp/${type}`;
                break;
            default:
                throw new Error('Invalid File Upload');
        }

        return (req, res, next) => {
            const multerStorage = multer.diskStorage({
                destination,
                filename: function (req, res, cb) {
                    cb(
                        null,
                        `${fieldName}-${Date.now()}.${file.originalname
                            .split('.')
                            .pop()}`
                    );
                }
            });
            const upload = multer({
                storage: multerStorage
            });
            const uploadSingle = upload.single(fieldName);
            uploadSingle.call(null, req, res, next);
        };
    } catch (error) {
        logger.error({
            description: error.message,
            error
        });
    }
};
