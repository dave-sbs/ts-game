// Exercise: Array Type Annotations
//
// Add type annotations to these arrays and the function that uses them.

let scores = [95, 87, 92, 78, 88];
let names = ["Alice", "Bob", "Charlie"];
let flags = [true, false, true, true];

// Add type annotations to this function's parameter and return type
function getAverage(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// Add type annotation to this function's parameter
function greetAll(people) {
  return people.map(name => `Hello, ${name}!`);
}

const avgScore = getAverage(scores);
const greetings = greetAll(names);

export { scores, names, flags, getAverage, greetAll };
