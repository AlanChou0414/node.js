// different with php, node.js con't require twice;
// eslint-disable-next-line no-unused-vars
const Person2 = require('./Person2');

// import into object, node.js require don't need Sideline;
const { Person, f2, f3 } = require('./Person2');

// import this ./Person2.js module exports object;
const p1 = new Person('David', 25);

console.log(p1.toString());
console.log(f2(9));
console.log(f3(9));
