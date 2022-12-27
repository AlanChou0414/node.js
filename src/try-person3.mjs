// file sideline [.mjs] can use ES6 syntax;
// use ES6 syntax import to require function;
import Person, {
  f2,
  f3,
// eslint-disable-next-line import/extensions
} from './Person3.mjs';

const p1 = new Person('David', 25);

console.log(p1.toString());
console.log(f2(8));
console.log(f3(8));
