const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const readExcelFile = require('../../middleware/readExcel');
const EmployeeController = new (require('../../controllers/EmployeeControlller'))();

router.post(
    'employee-bulk-upload',
    upload('employee-excel', 'excel'),
    readExcelFile,
    EmployeeController.uploadBulkEmployee
);

module.exports = router;
