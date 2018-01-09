# Beginning Student Language

Programming language specifically meant for people starting out with programming. 

## Module learning goals

- Write expressions that operate on primitive data.
- Write constant and function definitions.
- Write step-by-step evaluation of simple expressions.
- Use stepper to step through expression evaluation.
- Use Dr Racket help desk to discover new primitives.

### Expressions

Expressions use this syntax `(+ 3 4)`.

Couple of primitive operations: plus, times, minus, square and square root. 

### Evaluation

- Evaluation is from left to right.
- Expressions are evaluated inside to outside.

### Strings and images

Strings and images are also primitive data types.

This is a string: `"foo"`.

Example of string concatenation: `(string-append "foo" "bar")`. Other string primitives are `string-length` and `substring`.

Requiring modules can be done with (require 2htdp/image).

These are some image primitives: `circle`, `rectangle`, `text`, `above`, `beside`.

### Constant definitions

We can define constants with `(define FOO 42)`.

### Function definitions
