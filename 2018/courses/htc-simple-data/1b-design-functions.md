## Learning Goals

- Be able to use How to Design functions recipe to design functions that operate on primitive data.
- Be able to read a complete function design and identify its different element.
- Be able to evaluate the different elemenets for clarity, simplicity and consistency with each other.
- Be able to evaluate the entire design for how well it solves the given problem.

### HtDP recipe

The recipe consists of five parts. The order is not set in stone. You might go back a step. It's a structured process, but not a locked in waterfall process.:

1. Signature, purpose and stub.
2. Define examples, wrap each in check-expect (an assertion).
3. Template and inventory
4. Code the function body.
5. Test and debug until correct.

A signature is the first line in a function design. It specifies the arguments and the type of return data.

A purpose statement should describe what result is produced and how it uses the arguments.

Stub is a mock-version of a function. It has the proper name and parameters, but the body is simply the value of the return type.

A template describes the structure of the function. There are different kinds of ways to write a template, like a data driven template.

Example:
```
;; 1. Write the signature
;; Number -> Number

;; 2. Write the purpose
;; produce 2 times the given number

;; 4. Write examples (also serve as unit tests)
(check-expect (double 3) 6)
(check-expect (double 4.2) (* 2 4.2))

;(define (double n) 0 ); 3. The stub

;; 5. Write the template
;(define (double n)
;  (... n))

(define (double n)
  (* 2 n))
```

### Testing 
Code coverage is how much of your code is evaluated by tests. At a minimum, tests should have complete code coverage. If there's unevaluated code, you need more tests.

When you think of a new case or possibility of your code:
- Write an example (test)
- Update all affected parts of the design
* It sometimes involes existing tests or even the signature

