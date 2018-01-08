// This is an example of a Stack data structure with a manual iterator
const Stack1 = () => ({
  array: [],
  index: -1,
  // This is a shorthand function method for push: function push()..
  push(value) {
    return (this.array[(this.index += 1)] = value);
  },
  pop() {
    const value = this.array[this.index];

    // Removes the value from the stack
    this.array[this.index] = undefined;
    if (this.index >= 0) {
      this.index -= 1;
    }
    return value;
  },
  isEmpty() {
    return this.index < 0;
  },
  // Manually made iterator
  iterator() {
    let iterationIndex = this.index;

    return () => {
      if (iterationIndex > this.index) {
        iterationIndex = this.index;
      }
      if (iterationIndex < 0) {
        return { done: true };
      } else {
        return { done: false, value: this.array[iterationIndex--] };
      }
    };
  },
  iteratorAsObject() {
    let iterationIndex = this.index;

    return {
      next() {
        if (iterationIndex > this.index) {
          iterationIndex = this.index;
        }
        if (iterationIndex < 0) {
          return { done: true };
        } else {
          return { done: false, value: this.array[iterationIndex--] };
        }
      }
    };
  }
});

const stack = Stack1();
stack.push("hellooo");
const iter = stack.iterator();
iter().value; // "hellooo"

// Sum function that folds over a functional iterator
const iteratorSum = iterator => {
  let eachIteration;
  let sum = 0;

  while (((eachIteration = iterator()), !eachIteration.done)) {
    sum += eachIteration.value;
  }
  return sum;
};

const stack = Stack1();
stack.push(1);
stack.push(2);
iteratorSum(stack.iterator());

/*
Symbols are unique constants that do not conflict with existing strings.
JS has Symbol.iterator. It's a way to write iterators for objects. 
The Stack iterator can be written and called in the following way.

When objects are 'iterable', this means they have a Symbol.iterator method that returns
a object iterator. The for...of loop only works on objects that have these.
*/
const partOfStack = {
  [Symbol.iterator]() {
    let iterationIndex = this.index;

    return () => {
      if (iterationIndex > this.index) {
        iterationIndex = this.index;
      }
      if (iterationIndex < 0) {
        return { done: true };
      } else {
        return { done: false, value: this.array[iterationIndex--] };
      }
    };
  }
};

const iterator = partOfStack[Symbol.iterator]();

/*
The following is an example of how a object iterator could also works for a linked list
*/
const EMPTY = {
  isEmpty: () => true
};

const isEmpty = node => node === EMPTY;

const Pair1 = (first, rest = EMPTY) => ({
  first,
  rest,
  isEmpty() {
    return false;
  },
  [Symbol.iterator]() {
    let currentPair = this;

    return {
      next() {
        if (currentPair.isEmpty()) {
          return { done: true };
        } else {
          const value = currentPair.first;

          currentPair = currentPair.rest;
          return { done: false, value };
        }
      }
    };
  }
});

const list = (...elements) => {
  const [first, ...rest] = elements;

  return elements.length === 0 ? EMPTY : Pair1(first, list(...rest));
};

/*
Example of mapWith for ordered collections with a iterator
*/
const mapWith = (fn, collection) => ({
  [Symbol.iterator]() {
    const iterator = collection[Symbol.iterator]();

    return {
      next() {
        const { done, value } = iterator.next();

        return { done, value: done ? undefined : fn(value) };
      }
    };
  }
});
