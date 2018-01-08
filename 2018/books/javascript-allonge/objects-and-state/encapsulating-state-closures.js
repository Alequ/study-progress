// Closures can be used to hide state processes and expose methods to interact with state

// Example of a stack data structure where the inner obj holds hidden state
const Stack = () => {
  let state = [];
  let index = -1;

  return {
    push(value) {
      return (array[(index += 1)] = value);
    },
    pop() {
      const value = array[index];

      array[index] = undefined;
      if (index >= 0) {
        index -= 1;
      }
      return value;
    },
    isEmpty() {
      return obj.index < 0;
    }
  };

  return obj;
};
