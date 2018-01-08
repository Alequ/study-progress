// A simple numbers iterator
const Numbers = {
  [Symbol.iterator]: () => {
    let n = 0;

    return {
      next: () => ({ done: false, value: n++ })
    };
  }
};

// Difference between generating numbers and iterating
// Iteration
let n = 0;

() => ({ done: false, value: n++ });

// Generation
while (true) {
  console.log(n);
}

/*
Some collections are easier to generate than iterate over
This is illustrated for the following problem where we want to iterate
over a tree. 

The generation pattern utilizes language features to have it's state implicit.
With the iteration pattern we make every state change explicit.
*/
// With generation
const isIterable = something => !!something[Symbol.iterator];

const generate = iterable => {
  for (let element of iterable) {
    if (isIterable(element)) {
      generate(element);
    } else {
      console.log(element);
    }
  }
};

generate([1, [2, [3, [4, 5]]]]); // => 1 2 3 4 5

// With iteration
const treeIterator = iterable => {
  const iterators = [iterable[Symbol.iterator]()];

  return () => {
    while (!!iterators[0]) {
      const iterationResult = iterators[0].next();

      if (iterationResult.done) {
        iterators.shift();
      } else if (isIterable(iterationResult.value)) {
        iterators.unshift(iterationResult.value[Symbol.iterator]());
      } else {
        return iterationResult.value;
      }
    }
    return;
  };
};

/*
We can write iterators with a generative style.
There are two changes:
- Declare function using function * syntax. This is generator syntax.
- Don't return values but yield them.

"But no matter how JavaScript implements it, our mental model is that a generator function returns an iterator, and that when we call .next(), it runs until it returns, ends, or yields. If it yields, it suspends its own execution and the consuming code resumes execution, until .next() is called again, at which point the iterator resumes its own execution from the point where it yielded."
*/
function* only(something) {
  yield something;
}

only("you").next(); // => { "done": false, value: "you" }

// or

const sixteen = only("sixteen");

sixteen.next(); // => { "done": false, value: "sixteen" }
sixteen.next(); // => { "done": true }

/*
This is a implementation of a ordered collection with a generator function
*/
const ThreeNumbers = {
  [Symbol.iterator]: function*() {
    yield 1;
    yield 2;
    yield 3;
  }
};

for (const i of ThreeNumbers) {
  console.log(i); // =>
  // 1
  // 2
  // 3
}

[...ThreeNumbers]; // => [1,2,3]

const iterator = ThreeNumbers[Symbol.iterator]();

/*
This is a favorable pattern and there's also a shorthand for the generator function

"ThreeNumbers is an object we've made iterable, by way of 
writing a generator method for [Symbol.iterator]
*/
const SomeCollection = {
  *[Symbol.iterator]() {
    let i = 0;

    while (true) yield i++;
  }
};

// Example of a function that returns an iterator for a tree
function* tree(iterable) {
  for (const e of iterable) {
    if (isIterable(e)) {
      for (const ee of tree(e)) {
        yield ee;
      }
    } else {
      yield e;
    }
  }
}

for (const i of tree([1, [2, [3, [4, 5]]]])) {
  console.log(i);
}

function* append(...iterables) {
  for (const iterable of iterables) {
    // for (const element of iterable) {
    //   yield element;
    // }
    // This commented code can also be written as:
    yield* iterable;
  }
}

/*
We can now make a couple of rewrites to previously defined iterables where we defined Symbol.iterator and the objects manually
*/
const mapWithOld = (fn, iterable) => ({
  [Symbol.iterator]: () => {
    const iterator = iterable[Symbol.iterator]();

    return {
      next: () => {
        const { done, value } = iterator.next();

        return { done, value: done ? undefined : fn(value) };
      }
    };
  }
});

function* mapWithNew(fn, iterable) {
  for (const element of iterable) {
    yield fn(element);
  }
}
