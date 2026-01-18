# Basic Type Annotations

Type annotations in TypeScript allow you to explicitly specify the types of variables, function parameters, and return values.

## Why Use Type Annotations?

TypeScript can often infer types automatically, but annotations help:
- **Document intent** - Make your code self-documenting
- **Catch errors early** - TypeScript will warn you about type mismatches
- **Enable IDE features** - Better autocomplete and refactoring

## Basic Types

TypeScript has several primitive types:

```typescript
// String
let name: string = "Alice";

// Number
let age: number = 25;

// Boolean
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
```

## Function Annotations

Annotate parameters and return types:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function
const add = (a: number, b: number): number => {
  return a + b;
};
```

## The `any` Type

The `any` type disables type checking:

```typescript
let value: any = "hello";
value = 42;        // No error
value = true;      // No error
value.foo.bar;     // No error (but might crash!)
```

**Avoid `any` when possible!** It defeats the purpose of TypeScript.

## Type Inference

TypeScript can infer types from context:

```typescript
let message = "Hello"; // TypeScript infers: string
let count = 42;        // TypeScript infers: number

function double(n: number) {
  return n * 2;        // Return type inferred as number
}
```

## Practice Tips

1. Start by annotating function parameters
2. Let TypeScript infer return types when obvious
3. Use explicit annotations for complex objects
4. Avoid `any` - use `unknown` if type is truly unknown
