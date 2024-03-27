// Association
// one to many relationship
// - company has many employees

class Employee {
  private id: Number
  private name: String
  private salary: Number

  constructor(id: Number, name: String, salary: Number) {
    this.id = id
    this.name = name
    this.salary = salary
  }

  printInfo() {
    console.log(`id: ${this.id}, name: ${this.name}, salary: ${this.salary}`)
  }
}

class Company {
  private name: String
  private address: String

  // keep all employees in the employees array
  private employees: Employee[] = []

  constructor(name: String, address: String) {
    this.name = name
    this.address = address
  }

  recruit(name: String, salary: Number) {
    // auto generate the employee id
    const id = this.employees.length + 1

    // create a new object per employee
    const employee = new Employee(id, name, salary)
    this.employees.push(employee)
  }

  printCompanyDetails() {
    console.log(`name: ${this.name}, address: ${this.address}`)
    console.log(`-- employees --`)
    for (const employee of this.employees) {
      employee.printInfo()
    }
  }
}

const company = new Company('Emtec', 'Pune')
company.recruit('employee 1', 10000)
company.recruit('employee 2', 20000)
company.recruit('employee 3', 30000)
company.recruit('employee 4', 40000)
company.recruit('employee 5', 50000)
company.printCompanyDetails()
