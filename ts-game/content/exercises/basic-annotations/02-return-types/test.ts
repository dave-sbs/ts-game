// Type tests for the exercise
import { add, isAdult, formatCurrency } from './exercise';

// Verify return types
const numResult: number = add(1, 2);
const boolResult: boolean = isAdult(20);
const strResult: string = formatCurrency(10);

// Type assertions
type AddFn = (a: number, b: number) => number;
type IsAdultFn = (age: number) => boolean;
type FormatCurrencyFn = (amount: number) => string;

const _check1: AddFn = add;
const _check2: IsAdultFn = isAdult;
const _check3: FormatCurrencyFn = formatCurrency;
