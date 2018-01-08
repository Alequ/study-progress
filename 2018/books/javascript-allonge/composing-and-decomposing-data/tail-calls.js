/* In the previous examples, the recursive functions were not optimized.
 * The information of every function call was saved on the call stack.
 * Tail-call optimization occurs when a function's last act is to call another function and return the result.
 * JavaScript optimizes the kept memory and throws away the stack frame.
 */

// Non-TCO
const length = ([first, ...rest]) =>
  first === undefined ? 0 : 1 + length(rest);

// TCO
const lengthDelaysWork = ([first, ...rest], numberToBeAdded) =>
  first === undefined
    ? numberToBeAdded
    : lengthDelaysWork(rest, 1 + numberToBeAdded);

const length = n => lengthDelaysWork(n, 0);

// Or the mapWith function
const mapWithDelaysWork = (fn, [first, ...rest], prepend) =>
  first === undefined
    ? prepend
    : mapWithDelaysWork(fn, rest, [...prepend, fn(first)]);

// Non-TCO
const factorial = n => (n == 1 ? n : n * factorial(n - 1));

// TCO
const factorialWithDelayedWork = (n, work) =>
  n === 1 ? work : factorialWithDelayedWork(n - 1, n * work);

const factorial = n => factorialWithDelayedWork(n, 1);

// Factorial TCO with default argument for work
const factorial = (n, work = 1) =>
  n === 1 ? work : factorial(n - 1, n * work);
