// object with constructor function
function Person(name, address, age) {
    this.name = name;
    this.address = address;
    this.age = age;
}
var person1 = new Person('person1', 'pune', 20);
console.log(person1);
console.log("type of person = ".concat(typeof person1));
