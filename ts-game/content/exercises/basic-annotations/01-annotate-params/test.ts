// Type tests for the exercise
// The TypeScript compiler will check these

import { greet } from './exercise';

// These should work
const result1: string = greet("Alice", 25);
const result2: string = greet("Bob", 30);

// Type assertion to verify parameter types
type GreetFn = (name: string, age: number) => string;
const _typeCheck: GreetFn = greet;
