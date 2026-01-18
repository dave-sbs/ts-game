// Exercise: Annotate Function Parameters
// 
// Add type annotations to the function parameters below.
// The function should accept a name (string) and age (number).
//
// Example usage:
//   greet("Alice", 25) => "Hello Alice, you are 25 years old!"

function greet(name, age) {
  return `Hello ${name}, you are ${age} years old!`;
}

// Test calls (don't modify these)
const message1 = greet("Alice", 25);
const message2 = greet("Bob", 30);

export { greet };
