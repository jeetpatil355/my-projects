// Object instanciation

// using JSON
const person: {
  name: String
  address: String
  age: Number
  phone: String
  email: String
} = {
  name: 'person1',
  address: 'pune',
  age: 20,
  phone: '+91234345',
  email: 'person1@test.com',
}
console.log(person)

console.log('-')

// using Object
const mobile = new Object()
mobile['model'] = 'iPhone'
mobile['company'] = 'Apple'
mobile['configuration'] = new Object()
mobile['configuration']['cpu'] = 'Apple A14'
mobile['configuration']['ram'] = '8GB'

console.log(mobile)

const mobile2 = new Object()
mobile2['model'] = 'S23'
mobile2['company'] = 'Samsung'
mobile2['configuration'] = new Object()
mobile2['configuration']['cpu'] = 'Exynos'
mobile2['configuration']['ram'] = '12GB'
console.log(mobile2)

console.log('-')

// using Function
function Computer(model: String, company: String, cpu: String, ram: String) {
  this.model = model
  this.company = company
  this.cpu = cpu
  this.ram = ram
}

const c1 = new Computer('MacBook Pro', 'Apple', 'M2 Pro', '16GB')
console.log(c1)

const c2 = new Computer('iMac', 'Apple', 'M3', '32GB')
console.log(c2)
