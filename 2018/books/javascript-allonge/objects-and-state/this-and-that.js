// The BetterQueue solves the problem of not being able to copy the array because of this binding.
const Queue = () => {
  const queue = {
    array: [],
    head: 0,
    tail: -1,
    pushTail(value) {
      return (queue.array[++queue.tail] = value);
    },
    pullHead() {
      if (queue.tail >= queue.head) {
        const value = queue.array[queue.head];

        queue.array[queue.head] = undefined;
        queue.head += 1;
        return value;
      }
    },
    isEmpty() {
      return queue.tail < queue.head;
    }
  };
  return queue;
};

// Note that this one does not have a closure
// Downside is that state is exposed
const BetterQueue = () => ({
  array: [],
  head: 0,
  tail: -1,
  pushTail(value) {
    // Note the use of the this binding throughout
    return (this.array[(this.tail += 1)] = value);
  },
  pullHead() {
    if (this.tail >= this.head) {
      let value = this.array[this.head];

      this.array[this.head] = undefined;
      this.head += 1;
      return value;
    }
  },
  isEmpty() {
    return this.tail < this.head;
  }
});
