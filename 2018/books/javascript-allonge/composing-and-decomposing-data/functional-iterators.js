/*
In this example, arraySum has two responsibilties. It traverses
the array and also sums all parts. We can split those responsibilties up.
callLeft traverses, while the fold function sums.
*/
const oldArraySum = ([first, ...rest], acc = 0) =>
  first === undefined ? acc : arraySum(rest, first + acc);

const callLeft = (fn, ...args) => (...remainingArgs) =>
  fn(...args, ...remainingArgs);

const foldArrayWith = (fn, terminalVal, [first, ...rest]) =>
  first === undefined
    ? terminalVal
    : fn(first, foldArrayWith(fn, terminalVal, rest));

const newArraySum = callLeft(foldArrayWith, (a, b) => a + b, 0);

//-------------------------
// Data structure specifics are separated from traversal and data operation
const callRight = (fn, ...args) => (...remainingArgs) =>
  fn(...remainingArgs, ...args);

const foldArrayWith = (fn, terminalValue, [first, ...rest]) =>
  first === undefined
    ? terminalValue
    : fn(first, foldArrayWith(fn, terminalValue, rest));

const foldArray = array => callRight(foldArrayWith, array);

// This doesn't care if it's an array or not, just that it's foldable
const sumFoldable = folder => folder((a, b) => a + b, 0);

/*
The next examples go over iterating and introduce the concept
of separating iterators from looping logic
*/

// Problem: iterating and calculating are thrown together
const arraySum = array => {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};

// Slightly different example using a while loop
// Note that iteration specific vars are separated here
const arraySum2 = array => {
  let done,
    sum = 0,
    index = 0;

  while (((done = index == array.length), !done)) {
    const value = array[index++];
    sum += value;
  }
  return sum;
};

// Awkward code but illustrates those iteration specific vars
// being taken into a separate object
const arraySum3 = array => {
  let iter,
    sum = 0,
    index = 0;

  while (
    ((eachIteration = {
      done: index === array.length,
      value: index < array.length ? array[index] : undefined
    }),
    ++index,
    !eachIteration.done)
  ) {
    sum += eachIteration.value;
  }
};

// Separates the iterator logic completely into a different function
const arrayIterator = array => {
  let i = 0;

  return () => {
    const done = i === array.length;

    return {
      done,
      value: done ? undefined : array[i++]
    };
  };
};

const iteratorSum = iterator => {
  let eachIteration,
    sum = 0;

  while (((eachIteration = iterator()), !eachIteration.done)) {
    sum += eachIteration.value;
  }
  return sum;
};

iteratorSum(arrayIterator[(1, 4, 9, 16)]);
