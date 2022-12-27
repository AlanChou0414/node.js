// create class to return inside function;
class Person {
  constructor(name = 'noname', age = 0) {
    this.name = name;
    this.age = age;
  }

  // return JSON file
  toString() {
    const { name, age } = this;
    return JSON.stringify({ name, age });
  }
}

// other function can write same file.js;
const f2 = (a) => a * a;
const f3 = (a) => a * a * a;

// require first time;
console.log('This is Person2');

// output object function
module.exports = { Person, f2, f3 };
