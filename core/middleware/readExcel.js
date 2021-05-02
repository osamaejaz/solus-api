const path = require('path');
const logger = require('../utils/logger');
const fs = require('fs');
const XLSX = require('xlsx');

module.exports = (req, res, next) => {
    try {
        if (req.file) {
            const filePath = path.resolve(
                `${req.file.destination}/${req.file.filename}`
            );
            readFileFromLocal(filePath)
                .then((data) => {
                    req.fileData = data;
                    deleteFileFromLocal({ filePath });
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

const readExcelToArray = (buffers) => {
    let fileContent = [];
    const buffer = Array.isArray(buffers) ? Buffer.concat(buffers) : buffers;
    const workbook = XLSX.read(buffer, { cellDates: true });
    const wsname = workbook.SheetNames[0];
    fileContent = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);

    if (!fileContent) {
        return false;
    }
    return fileContent;
};

const deleteFileFromLocal = ({ filePath }) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw new Error(err);
        }
    });
}