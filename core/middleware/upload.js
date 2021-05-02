const multer = require('multer');
const logger = require('../utils/logger');

module.exports = (fieldName, type) => {
    try {
        let dest = '';
        switch (type) {
            case 'excel':
                dest = `temp/${type}`;
                break;
            case 'image':
                dest = `temp/${type}`;
                break;
            default:
                throw new Error('Invalid File Upload');
        }
        return (req, res, next) => {
            const multerStorage = multer.diskStorage({
                destination: dest,
                filename: function (req, file, cb) {
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
