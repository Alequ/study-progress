/* 
You can set your own context using call
Call is a method that functions have
When you call a function with call, you can set the context by passing it as the first parameter
*/
const a = [1, 2, 3],
  b = [4, 5, 6];

a.concat([2, 1]); // => [1,2,3,2,1];

a.concat.call(b, [2, 1]); // => [4,5,6,2,1]
// a.b() is synonymous with a.b.call(a)

/*
Arguments is a method on every function that returns a special object holding all arguments
It's a bit similar to an array and only works with the ufnction keyword
*/
const third = function() {
  return arguments[2];
};

third(1, 2, 3, 4, 5); // => 3

/*
Apply takes context as it's first argument and an arr of args as it's second argument
*/
third.apply(this, [1, 2, 3, 4, 5]); // => 3

// Utility fn to set context
const contextualize = (fn, context) => (...args) => fn.apply(context, args);

/* Difference between call and apply is that apply lets you invoke the function with arguments 
as an array while call requires the parameters to be listed explicitly. */
