# JavaScript

## fundamentals

- interpreted language
- object oriented (based) programming language
- dynamically linked language
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
  - set
    - collection of unique values
