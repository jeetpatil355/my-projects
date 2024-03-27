// single or simple inheritance
// one super and one sub class

class Person {
  protected name: String
  protected address: String

  constructor(name: String, address: String) {
    this.name = name
    this.address = address
  }
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

const student1 = new Student(1, 80, 'student1', 'pune')
const student2 = new Student(2, 50, 'student2', 'mumbai')
