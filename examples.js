// Oliver Kovacs 2020
// js-operator-overloading - examples.js

// create a class inheriting from one of the overloadable classes
// define what adding two instances of the class does in the abstract static _add() method
// in OOBject, define how the sum should be deserialized in the abstract static _spread() method

const { OArray, OObject } = require("./index.js");
let a, b, c;



// 1) Array based dynamic n-dimensional vector

class VectorN extends OArray {

    static _add(a, b) {
        return a.map((e, i) => {
            return e + b[i];
        });
    }
}

a = new VectorN(1, 2);
b = new VectorN(3, 4);
c = new VectorN(5, 6);
console.log(new VectorN(a + b + c));    // VectorN(2) [ 9, 12 ]



// 2) Object based 2d vector

class Vector2 extends OObject {

    constructor(...args) {
        super(...args);
        if (args.length > 1) {
            let [ x, y ] = args;
            this.x = x;
            this.y = y;
        }
    }

    static _add(a, b) {
        return {
            x: a.x + b.x,
            y: a.y + b.y
        };
    }

    static _spread(a) {
        return [ a.x, a.y ];
    }
}

a = new Vector2(1, 2);
b = new Vector2(3, 4);
c = new Vector2(5, 6);
console.log(new Vector2(a + b + c));    // Vector2 { x: 9, y: 12 }



// 3) Array that can be concatonated with operator overloading

class AArr extends OArray {

    static _add(a, b) {
        return a.concat(b);
    }
}

a = new AArr(...[ "a", "b", "c" ]);
b = new AArr(...[ 0, 1, 2 ]);
c = new AArr(...[ "x", "y", "z" ]);
console.log(new AArr(a + b + c));       // AArr(9) [ "a", "b", "c", 0, 1, 2, "x", "y", "z" ]