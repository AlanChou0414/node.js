// import into
const Person2 = require('./Person2');

// import this ./Person2.js module exports object
const p1 = new Person2.Person('David', 25);

console.log(p1.toString());
console.log(Person2.f2(9));
