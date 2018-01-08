// maybe with no context preservation
const maybe = fn => x => (x != null ? fn(x) : x);

// Here we actually have the context preserved by using call
const maybe2 = fn =>
  function(x) {
    return x != null ? fn.call(this, x) : x;
  };

// Another variation
const maybe3 = fn =>
  function(...args) {
    for (const i in args) {
      if (args[i] == null) return args[i];
    }
    return fn.apply(this, args);
  };

// Now we can decorate methods because the this is correctly set to the receiver (object which owns the method)
const someObj = {
  setSize: maybe3(function(size) {
    this.size = size;
  })
};

// :-)
