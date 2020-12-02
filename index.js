// Oliver Kovacs 2020
// js-operator-overloading - index.js
// Pseudo-operator-overloading in JavaScript for + using toString() and inherited class constructors

// overloadable array
class OArray extends Array {

    static _add;
    static _seperator = "+++";
    constructor(...args) {
        if (args.length === 1 && typeof args[0] === "string") {
            super();
            let terms = args[0].split(this.constructor._seperator).slice(0, -1).map(term => JSON.parse(term));
            let sum = terms.reduce((prev, curr) => {
                return this.constructor._add(prev, curr);
            });
            return new this.constructor(...sum);
        }
        super(...args);
    }

    _toString = toString;
    toString() {
        return `${JSON.stringify(this)}${this.constructor._seperator}`;
    }
}

// overloadable object
class OObject {

    static _add;
    static _spread;
    static _seperator = "+++";
    constructor(...args) {
        if (args.length === 1 && typeof args[0] === "string") {
            let terms = args[0].split(this.constructor._seperator).slice(0, -1).map(term => JSON.parse(term));
            let sum = terms.reduce((prev, curr) => {
                return this.constructor._add(prev, curr);
            });
            return new this.constructor(...this.constructor._spread(sum));
        }
    }

    _toString = toString;
    toString() {
        return `${JSON.stringify(this)}${this.constructor._seperator}`;
    }
}

module.exports = { OArray, OObject };