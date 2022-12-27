// file sideline [.mjs] can use ES6 syntax;

// create class to return inside function;
class Person {
  constructor(name = 'noname', age = 0) {
    this.name = name;
    this.age = age;
  }

  // return JSON file
  toString() {
    const {
      name,
      age,
    } = this;
    return JSON.stringify({
      name,
      age,
    });
  }
}

// just use export can output many function;
export const f2 = (a) => a * a;
const f3 = (a) => a * a * a;

// require first time;
console.log('This is Person2');

// use ES6 syntax;
export default Person; // use default just can output one;

// just use export can output many function;
export {
  f3,
};
