// Association
// one to many relationship
// - company has many employees
var Employee = /** @class */ (function () {
    function Employee(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
    Employee.prototype.printInfo = function () {
        console.log("id: ".concat(this.id, ", name: ").concat(this.name, ", salary: ").concat(this.salary));
    };
    return Employee;
}());
var Company = /** @class */ (function () {
    function Company(name, address) {
        // keep all employees in the employees array
        this.employees = [];
        this.name = name;
        this.address = address;
    }
    Company.prototype.recruit = function (name, salary) {
        // auto generate the employee id
        var id = this.employees.length + 1;
        var employee = new Employee(id, name, salary);
        this.employees.push(employee);
    };
    Company.prototype.printCompanyDetails = function () {
        console.log("name: ".concat(this.name, ", address: ").concat(this.address));
        console.log("-- employees --");
        for (var _i = 0, _a = this.employees; _i < _a.length; _i++) {
            var employee = _a[_i];
            employee.printInfo();
        }
    };
    return Company;
}());
var company = new Company('Emtec', 'Pune');
company.recruit('employee 1', 10000);
company.recruit('employee 2', 20000);
company.recruit('employee 3', 30000);
company.recruit('employee 4', 40000);
company.recruit('employee 5', 50000);
company.printCompanyDetails();
