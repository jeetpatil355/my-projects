// load system's module
const os = require('os')

console.log(`architecture of your CPU = ${os.arch()}`)
console.log(`operating system: ${os.platform()}`)

// get the CPUs
const cpus = os.cpus()
console.log(`number of processors = ${cpus.length}`)
// console.log(cpus)

function toGB(size) {
  return size / (1024 * 1024 * 1024)
}
console.log(`total memory = ${toGB(os.totalmem())}GB`)
console.log(`free memory = ${toGB(os.freemem())}GB`)
console.log(os.version())
