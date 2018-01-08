// These are a bunch of typed over recipes from the recipes section of this chapter

// This function will be slow because it recalculates the same results all the time
const fibo = n => (n < 2 ? n : fibo(n - 2) + fibo(n - 1));

// We can create a lookup table to store computed results which can be looked up when needed
const memoized = fn => {
  const lookupTable = {};

  return function(...args) {
    const key = JSON.stringify(this, args);

    return lookupTable[key] || (lookupTable[key] = fn.apply(this, args));
  };
};

const fastFibo = memoized(n => (n < 2 ? n : fastFibo(n - 2) + fastFibo(n - 1)));
