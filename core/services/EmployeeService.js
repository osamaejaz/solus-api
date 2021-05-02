const EmployeeModel = require('../models/Employee');
let instance = '';
class EmployeeService {
    constructor() {}
    static getInstance() {
        if (!instance) {
            instance = new EmployeeService();
        }
        return instance;
    }

    async addNewEmployee({ employeeData }) {
        console.log(employeeData)
        const { code, emailId } = employeeData;
        const isCodeAndEmailTaken = await this.isCodeAndEmailTaken({ code, emailId });
        if (isCodeAndEmailTaken) {
            throw new Error('Code or Email Already assigned');
        }
        const employee = await EmployeeModel.create(employeeData);
        return employee;
    }

    async isCodeAndEmailTaken({ code, emailId }) {
        const findConditions = {};
        findConditions['$or'] = [{ code }, { emailId }];
        const user = await EmployeeModel.findOne(findConditions);
        return !!user;
    }

    async uploadBulkEmployee({ excelData = [] }) {
        const { items = [], isExcelValid } = this.validateBulkUpload({
            excelData
        });
        if (!isExcelValid) {
            // Generate Error report;
            return isExcelValid;
        }

        if (items && items.length) {
            try {
                const result = await EmployeeModel.insertMany(items);
                return result;
            } catch (error) {
                throw new Error(error);
            }
        }
    }

    validateBulkUpload({ excelData = [] }) {
        let items = [];
        let isExcelValid = true;
        let codes = [];
        if (excelData && excelData.length) {
            for (let data of excelData) {
                const remarks = [];
                this.trimData(data);
                if (data.rowExists) {
                    if (!data.code) {
                        remarks.push('Code is required');
                    }
                    if (data.code) {
                        codes.includes(data.code)
                            ? remarks.push('Duplicate Code')
                            : '';
                        codes.push(data.code);
                    }
                    if (!data.name) {
                        remarks.push('Name is required');
                    }
                    if (!data.gender) {
                        remarks.push('Gender is required');
                    }
                    if (!data.maritalStatus) {
                        remarks.push('Marital Status is required');
                    }
                    if (!data.bloodGroup) {
                        remarks.push('Blood group is required');
                    }
                    if (!data.emailId) {
                        remarks.push('Email Id is required');
                    }

                    if (remarks.length) {
                        data['remarks'] = remarks
                            .map((remark) => remark)
                            .join('\n');
                        isExcelValid = false;
                    }

                    items.push(data);
                }
            }
        }
        return { items, isExcelValid };
    }

    trimData(data) {
        data.hasOwnProperty('Code')
            ? ((data['code'] = String(data['Code']).trim()),
              delete data['Code'])
            : '';
        data.hasOwnProperty('Name')
            ? ((data['name'] = String(data['Name']).trim()),
              delete data['Name'])
            : '';

        data.hasOwnProperty('Gender')
            ? ((data['gender'] = String(data['Gender']).trim()),
              delete data['Gender'])
            : '';
        data.hasOwnProperty('Marital Status')
            ? ((data['maritalStatus'] = String(data['Marital Status']).trim()),
              delete data['Marital Status'])
            : '';
        data.hasOwnProperty('Blood Group')
            ? ((data['bloodGroup'] = String(data['Blood Group']).trim()),
              delete data['Blood Group'])
            : '';
        data.hasOwnProperty('Email Id')
            ? ((data['emailId'] = String(data['Email Id']).trim()),
              delete data['Email Id'])
            : '';
        data.rowExists = true;
        return;
    }
}

module.exports = EmployeeService.getInstance();
