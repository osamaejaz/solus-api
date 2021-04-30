let instance = '';
class EmployeeService {
    constructor() {}
    static getInstance() {
        if (!instance) {
            instance = new EmployeeService();
        }
        return instance;
    }
    async uploadBulkEmployee({ excelData = [] }) {
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
                }
            }
        }
        return excelData;
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
