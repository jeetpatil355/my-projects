# JavaScript

## fundamentals

- interpreted language
- object oriented (based) programming language
- functional programming languages
  - functions are considered as first class citizen (you can create variable of type function)
  - a function can be passed as an argument to another function
  - a function can be returned as a return value of another function
- dynamically linked language
- dynamically typed language
- loosely typed language
- it is not a type safe language
- you can add script in both head and body
- pre-defined objects
  - console
    - used to print output or error on JS console
    - targeted to the developer
    - methods
      - log: used to show messages
      - error: used to show errors
  - window
    - used to render output for user (UI)
    - targeted to the user

## conventions

- identifier (variable) rules
  - must not use any special character
    - e.g. name one = "test" : wrong (using space)
    - e.g. name1 = "test" : right
  - must not start the identifier name with number
    - e.g. 1name = "steve" : wrong
    - e.g. name1 = "steve" : right
  - always use camel convention
    - e.g. first_name = "steve" : wrong
    - e.g. firstName = 'steve' : right
- always prefer using immutable (const) over mutable (let)

## variables

- the data type of variable(s) will be inferred
- the data type will be decided by JS by inspecting the current value stored in the variable
- there two ways to declare variables
  - variable
    - use let keyword to declare a variable
    - it can change its value
    - it is treated as mutable
    - e.g. let num = 10
  - constant
    - use const keyword to declare a constant
    - it can not modified
    - it is treated as immutable
    - e.g. const num = 100

## predefined values

- null
  - the value is missing
- undefined
  - the variable can not be defined
- NaN
  - Not a Number
- Infinity
  - answer to anything divided by zero

## data types

- number
  - covers both whole as well as decimal numbers
- string
  - can be declared with ' and " for single line string
  - can be declared with ` for multi-line string
- boolean
  - can have only one of the values: true or false
- undefined
  - the variable CAN NOT be defined
  - either because the initial value is missing
  - or because it is declared with undefined (value)

## collection

- collection of similar or dissimilar values
- types
  - array
    - allows duplicate values
    - uses [] to declare
    - properties
      - length: used to get the number of values present in the array
    - methods
      - push(): used to add a value at the end of the collection
      - pop(): used to delete last value from the collection
      - splice():
        - used to insert value in between
          - e.g. array.splice(1, 0, 15)
        - used to delete a value in between
          - e.g. array.splice(1, 1)
        - used to delete multiple values from an index
          - e.g. array.splice(1, 3)
        - used to replace a value with newer one
          - e.g. array.splice(1, 1, 30)
      - sort(): used to sort the collection in ascending order
      - reverse(): used to reverse the collection
      - map(): used to perform transformations on every value of collection
      - filter(): used to perform selection operation on collection
      - forEach(): similar to the for..of loop
      - findIndex():
        - used to find the index of required value
        - if the value does not exist, find() returns -1
      - includes(): used to check if a value is present
  - set
    - collection of unique values
    - does not allow duplicate values
    - property
      - size: returns the length of set
    - methods
      - add(): used to add a value to the set object
      - has(): used to check if a value is present in the set
      - delete(): used to delete a value from set
      - clear(): used to delete all values from set
      - values(): used to get all values from the set object
  - map
    - collection of key-value pairs
    - property
      - size: used to get the length of map
    - methods
      - clear(): used to delete all the values
      - delete(): used to delete a key-value pair. it accepts the key to be deleted
      - has(): used to check if a key is present in the map
      - values(): used to get all values from the map object
      - keys(): used to get all keys from the map object

## function

- named or unnamed block of code used for reusability
- you can not separate function declaration from function body
- types
  - does function contain name
    - named function
    - unnamed or anonymous
      - using function keyword
      - arrow or fat arrow function
  - does function contain parameter(s)
    - parameter less function
    - parameterized function
  - does function return a value
    - returning function
    - non-returning function
  - does function contain body with code
    - empty function
    - non-empty function
- important points
  - every function returns value
    - if a function is not explicitly returning value then by default it returns undefined
  - function can not restrict the caller to pass the required data type
  - function can accept less or more number of arguments than it is declaring
    - all parameters in function are optional (if not passed, they get the default value as undefined)
  - every function by default accepts two hidden parameters
    - this: reference to the current function object
    - arguments: collection of all the parameters
      - every function is a variable length argument function
- callback function
  - is written by developer but never gets called by developer explicitly

## object oriented programming

- everything is an Object
- Object is root function in JavaScript

- object
  - collection of properties and methods
  - property = key [will be always of type string]
  - set or get value of a property using [] or . syntax
  - ways to create an object
    - using JSON (JavaScript Object Notation)
      - object using {}
      - array using []
    - using Object function (Object literal)
    - using custom function
    - using class
