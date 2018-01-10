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
Functions can be defined and called like:

```
(define (someFunc a) (2 + a))
(someFunc 2)
```

### Booleans and if expressions
Predicates are primitives or functions that return a boolean value. 

And operator can be used like `(and (= 1 2) (< 1 3))`. There is also the `or` and `not` primitive.

### Stepper
The stepper (a debugger) takes you through the call stack.

### Practice problems:

*P1*
```
Write two expressions that multiply the numbers 3, 5 and 7. 
The first should take advantage of the fact that * can accept more than 2 arguments. 
The second should build up the result by first multiplying 3 times 5 and then multiply the result of that by 7.

(* 3 5 7)
(* (* 3 5) 7)
```

*P2*
```
; Use the DrRacket square, beside and above functions to create an image like this one:
;
; If you prefer to be more creative feel free to do so. You can use other DrRacket image
; functions to make a more interesting or more attractive image.

(above
 (beside
  (square 20 "solid" "blue")
  (square 20 "solid" "yellow"))
 (beside
  (square 20 "solid" "yellow")
  (square 20 "solid" "blue")))
```

*P3*
```
(require 2htdp/image)

;; compare-images-starter.rkt

;
; PROBLEM:
;
; Based on the two constants provided, write three expressions to determine whether:
;
; 1) IMAGE1 is taller than IMAGE2
; 2) IMAGE1 is narrower than IMAGE2
; 3) IMAGE1 has both the same width AND height as IMAGE2
;

(define IMAGE1 (rectangle 10 15 "solid" "red"))
(define IMAGE2 (rectangle 15 10 "solid" "red"))

(> (image-height IMAGE1) (image-height IMAGE2))
(< (image-width IMAGE1) (image-width IMAGE2))

(and
 ( = (image-height IMAGE1) (image-height IMAGE2))
 ( = (image-width IMAGE1) (image-width IMAGE2)))
```

*P4*
```
;; more-foo-evaluation-starter.rkt

; PROBLEM:
;
; Given the following function definition:
;
; (define (foo n)
;   (* n n))
;
; Write out the step-by-step evaluation of the expression:
;
; (foo (+ 3 4))
;
; Be sure to show every intermediate evaluation step.

(foo 7)

(* 7 7)

49
```

*P5*
```
;; function-writing-starter.rkt

; 
; PROBLEM:
; 
; Write a function that consumes two numbers and produces the larger of the two. 
; 


(define (larger a b)
  (if (< a b)
   a
   b
  ))

(larger 1 2)
```

*P6*
```
;
; PROBLEM:
;
; Given the following function definition:
;
; (define (foo s)
;   (if (string=? (substring s 0 1) "a")
;       (string-append s "a")
;       s))
;
; Write out the step-by-step evaluation of the expression:
;
; (foo (substring "abcde" 0 3))
;
; Be sure to show every intermediate evaluation step.
;


(foo "abc")

((if (string=? (substring "abc" 0 1) "a")
      (string-append "abc" "a")
      "abc"))

((if  true
      (string-append "abc" "a")
      "abc"))

(string-append "abc" "a")

"abca"
```
