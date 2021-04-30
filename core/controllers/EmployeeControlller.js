const EmployeeService = require('../services/EmployeeService');
class EmployeeController {
    constructor() { }
    async uploadBulkEmployee(req, res) {
        try {
            const { fileData: excelData = [] } = req;
            const data = await EmployeeService.uploadBulkEmployee({ excelData });
            res.status(200).send({
                data
            })
        } catch (error) {
            
        }
        
    }
}

module.exports = EmployeeController;