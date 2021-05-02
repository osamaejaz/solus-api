const EmployeeService = require('../services/EmployeeService');
class EmployeeController {
    constructor() {}
    async uploadBulkEmployee(req, res) {
        try {
            const { fileData: excelData = [] } = req;
            const data = await EmployeeService.uploadBulkEmployee({
                excelData
            });
            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: JSON.stringify(error)
            });
        }
    }

    async addNewEmployee(req, res) {
        try {
            const { body } = req;
            const data = await EmployeeService.addNewEmployee({
                employeeData: body
            });
            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                error: JSON.stringify(error)
            });
        }
    }
}

module.exports = EmployeeController;
