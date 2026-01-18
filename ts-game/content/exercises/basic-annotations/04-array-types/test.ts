// Type tests for the exercise
import { scores, names, flags, getAverage, greetAll } from './exercise';

// Verify array types
const _scores: number[] = scores;
const _names: string[] = names;
const _flags: boolean[] = flags;

// Verify function types
const _avg: number = getAverage([1, 2, 3]);
const _greets: string[] = greetAll(["Test"]);

type GetAverageFn = (numbers: number[]) => number;
type GreetAllFn = (people: string[]) => string[];

const _check1: GetAverageFn = getAverage;
const _check2: GreetAllFn = greetAll;
