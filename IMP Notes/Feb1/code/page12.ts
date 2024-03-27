// hierarchical inheritance
// one super class is extended by multiple subclasses

class Person {
  protected name: String
  protected address: String

  constructor(name: String, address: String) {
    this.name = name
    this.address = address
  }
}

class Player extends Person {
  protected team: String

  constructor(team: String, name: String, address: String) {
    super(name, address)
    this.team = team
  }
}

class Employee extends Person {
  protected id: Number
  private salary: Number

  constructor(id: Number, salary: Number, name: String, address: String) {
    super(name, address)
    this.id = id
    this.salary = salary
  }
}

class Manager extends Employee {
  department: String
}

class Student extends Person {
  protected rollNo: Number
  private marks: Number

  constructor(rollNo: Number, marks: Number, name: String, address: String) {
    // calling super class (Person) constructor to create a new object of
    // type Person inside the Student class object
    super(name, address)
    this.rollNo = rollNo
    this.marks = marks
  }
}
