class Person {
  protected name: String
  protected address: String

  constructor(name: String, address: String) {
    this.name = name
    this.address = address
  }

  printInfo() {
    console.log(`called from Person`)
    console.log(`name = ${this.name}, address = ${this.address}`)
  }

  myMethod() {}
}

class Student extends Person {
  protected roll: Number

  constructor(roll: Number, name: String, address: String) {
    super(name, address)
    this.roll = roll
  }

  // Student has overriden the method named printInfo
  printInfo() {
    console.log(`called from Student`)
    console.log(`roll = ${this.roll}`)
    console.log(`name = ${this.name}`)
    console.log(`address = ${this.address}`)
  }
}

const p1 = new Person('person1', 'pune')

// this method will be called from Person class
p1.printInfo()

const s1 = new Student(1, 'student 1', 'mumbai')

// this method will be called from Student class
s1.printInfo()

s1.myMethod()
