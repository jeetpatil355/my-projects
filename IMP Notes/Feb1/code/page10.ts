// multi-level inheritance

class Person {
  protected name: String
  protected address: String

  constructor(name: String, address: String) {
    this.name = name
    this.address = address
  }

  method1() {}
}

class Employee extends Person {
  protected id: Number
  private salary: Number

  constructor(id: Number, salary: Number, name: String, address: String) {
    super(name, address)
    this.id = id
    this.salary = salary
  }

  method1() {}
  method2() {}
}

class Manager extends Employee {
  department: String

  constructor() {
    super(1, 0, '', '')
  }
  method3() {}
}

const m = new Manager()
m.method1()
m.method2()
m.method3()
