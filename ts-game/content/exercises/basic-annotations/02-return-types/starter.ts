// Exercise: Add Return Types
//
// Add explicit return type annotations to these functions.
// TypeScript can infer these, but being explicit improves readability.

function add(a: number, b: number) {
  return a + b;
}

function isAdult(age: number) {
  return age >= 18;
}

function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

// Test calls
const sum = add(5, 3);
const adult = isAdult(21);
const price = formatCurrency(19.99);

export { add, isAdult, formatCurrency };
