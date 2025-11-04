class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
        //this.sayHello = this.sayHello.bind(this);
    }

    sayHello = () => {
        console.log(`Hello, ${this.name}!`);
    }
}

let jack = new Employee('Jack', 100_000);
jack.sayHello(); // sayHello(jack)
setInterval(() => jack.sayHello(), 1_000);
