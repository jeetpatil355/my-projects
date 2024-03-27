// list of abstract methods
interface Shape {
  calculateArea()
}

class Circle implements Shape {
  radius: number

  calculateArea() {
    console.log(`calculating area of circle`)
  }
}

class Square implements Shape {
  side: number

  calculateArea() {
    console.log(`calculating area of square`)
  }
}

class Rectangle implements Shape {
  width: number
  height: number

  calculateArea() {
    console.log(`calculating area of Rectangle`)
  }
}

function performOperation(shape: Shape) {
  shape.calculateArea()
}

const circle = new Circle()
performOperation(circle)

const square = new Square()
performOperation(square)

const rectangle = new Rectangle()
performOperation(rectangle)
