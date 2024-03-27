# TypeScript

## fundamentals

- TS is superset of JS
- add the types into JS
- strictly typed language
- to execute the TS code
  - use tsc to transpile the code into JS
  - use JS engine to execute the transpile JS code
- command
  - tsc --outFile page.js <typescript page>

## data types

- ways to use data types
  - implicit
    - like JS, the type will be inferred
  - explicit
    - unlike JS, the type must be given by developer
- terminologies
  - abstraction
    - hiding the data members from outside world
    - making the properties private
  - encapsulation
    - capsulating (bringging) all the members inside the class
    - collecting the properties inside a class
- types
  - Number:
  - String:
  - Boolean:
  - undefined:
  - Object:
  - union:
  - any:
- user defined types
  - class (reference types)
    - template or blueprint to create object
    - collection of properties and methods
    - property
      - variable stored inside an object to store a value
      - also known as attribute
    - method
      - function declared inside a class
  - interface
  - type
- methods
  - constructor
    - special method of class which is used to construct or initialize the object of that class
    - gets called automatically for every object
    - gets called only once for every object
    - the constructor must be the name of the constructor method
    - every class must have one constructor
      - if there is no explicit constructor present in the class, TS adds a default (parameterless) constructor
  - facilitator
    - used to add a facility inside the class
  - setter
    - also known as mutator
    - used to set a value of a property
  - getter
    - also known as inspector
    - used to get value of a property
- classifiers
  - access specifiers
    - private
      - can be accessed inside the class only
      - can not be accessed outside the class
    - protected
      - can be accessed inside the same class as well as the child class(es)
      - can not be accessed outside the class
    - public
      - this is a default access specifier
      - accessible outside the class
  - readonly
    - once set the property can not change anymore

## code reuse

- association
  - used when the objects (classes) are associated with each others
  - types
    - composition
      - also known as composed-of
      - the relationship is very strong
      - e.g. Person is composed-of heart, Car is composed-of engine
    - aggregation
      - is also known as has-a
      - the relationship is weak
      - e.g. Person has-a car
- inheritance
  - every subclass object has an object of super class
- overriding the method
  - the method will be called from the type of object
