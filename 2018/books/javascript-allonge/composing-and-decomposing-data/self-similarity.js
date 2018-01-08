// Flattening
/* The important elements are:
   Dividing a problem into subproblems
   Detecting terminal cases
   Solving terminal cases
  Composing solution from solved portions */
const flatten = ([first, ...rest]) => {
  // first terminal case
  if (first === undefined) {
    return [];
  } else if (!Array.isArray(first)) {
    // second terminal case
    // if it isn't an array, combine it with the solution
    return [first, ...flatten(rest)];
  } else {
    // third terminal case
    // In this case it is an array with items which requires flattening (first)
    return [...flatten(first), ...flatten(rest)];
  }
};

// Mapping
// This is a similar linear recursive example for a mapping function that squares numbers
const squareAll = ([first, ...rest]) =>
  // Terminal case
  first === undefined
    ? []
    : // Square the element being solved and call the function with the remaining elements that need solving
      [first * first, ...squareAll(rest)];

// The next examples implements a recursive mapWith function
// The first argument is the function, while the second is the data to operate on
const mapWith = (fn, [first, ...rest]) =>
  first === undefined ? [] : [fn(first), ...mapWith(fn, rest)];

/* These next examples tackle folding instead of mapping.
 * When mapping, functions are being applied to arguments.
 * When folding, elements are combined with a given operation.
 * Fold is also called reduce.
*/
const sumSquares = ([first, ...rest]) =>
  first === undefined ? 0 : first * first + sumSquares(rest);

// mapWith rewritten into a folding fn
const foldWith = (fn, terminalValue, [first, ...rest]) =>
  first === undefined
    ? terminalValue
    : fn(first, foldWith(fn, terminalValue, rest));

// The above fuction can be called as such:
foldWith((number, rest) => number * number + rest, 0, [1, 2, 3, 4, 5]);
