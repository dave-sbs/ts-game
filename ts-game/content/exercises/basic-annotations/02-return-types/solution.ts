// Solution: Add Return Types

function add(a: number, b: number): number {
  return a + b;
}

function isAdult(age: number): boolean {
  return age >= 18;
}

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// Test calls
const sum = add(5, 3);
const adult = isAdult(21);
const price = formatCurrency(19.99);

export { add, isAdult, formatCurrency };
