const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const readExcelFile = require('../../middleware/readExcel');
const EmployeeController = new (require('../../controllers/EmployeeControlller'))();

router.post(
    '/employee-bulk-upload',
    upload('bulkEmployee', 'excel'),
    readExcelFile,
    EmployeeController.uploadBulkEmployee
);

module.exports = router;
