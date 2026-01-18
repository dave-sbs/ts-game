// Solution: Array Type Annotations

let scores: number[] = [95, 87, 92, 78, 88];
let names: string[] = ["Alice", "Bob", "Charlie"];
let flags: boolean[] = [true, false, true, true];

function getAverage(numbers: number[]): number {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

function greetAll(people: string[]): string[] {
  return people.map(name => `Hello, ${name}!`);
}

const avgScore = getAverage(scores);
const greetings = greetAll(names);

export { scores, names, flags, getAverage, greetAll };
