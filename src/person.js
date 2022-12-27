class Person {
    constructor(name = 'noname', age = 0) {
        this.name = name;
        this.age = age;
    }

    //return JSON
    toString() {
        const { name, age } = this;
        return JSON.stringify({ name, age });
    }
}

module.exports = Person;