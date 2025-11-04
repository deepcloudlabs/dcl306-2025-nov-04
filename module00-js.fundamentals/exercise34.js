console.log("1. Start");
setTimeout(function() {
    console.log("5/6. setTimeout(): timer queue");
},0);
setImmediate( // after i/o
    function() {
        console.log("5/6. setImmediate()");
    }
)
Promise.resolve().then(
    function() { // microtask queue
        console.log("4. Microtask");
    }
)
process.nextTick(
    function() { // next tick queue
        console.log("3. process.nextTick()");
    }
)
console.log("2. End");

// task -> function
// next tick queue <- process.nextTick( function )
// microtask queue <- Promise.resolve().then( function )
// timer queue <- setTimeout( function )/setInterval( function )
// i/o queue   <- lib. mongoose, express, ... -> setImmediate( function )
// event queue <- document.querySelector("#btn3").dispatchEvent(), EventEmitter
