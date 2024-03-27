// base class
// parent class
// super class
class Person {
  protected name: String
  protected age: Number
  protected address: String
}

// Employee extends Person
// Employee is-a Person
// Employee is derived from Person
// Employee is inherited from Person
// derived class
// child class
// subclass
class Employee extends Person {
  private id: Number
  private salary: Number

  printInfo() {
    console.log(`id = ${this.id}`)
    console.log(`salary = ${this.salary}`)

    // accessing the properties from Person class
    console.log(`name = ${this.name}`)
    console.log(`address = ${this.address}`)
    console.log(`age = ${this.age}`)
  }
}

const p1 = new Person()
const e1 = new Employee()
