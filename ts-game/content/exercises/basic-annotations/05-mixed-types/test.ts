// Type tests for the exercise
import { 
  productName, 
  price, 
  inStock, 
  tags, 
  calculateDiscount, 
  formatProduct, 
  addTags, 
  isExpensive 
} from './exercise';

// Verify variable types
const _name: string = productName;
const _price: number = price;
const _stock: boolean = inStock;
const _tags: string[] = tags;

// Verify function types
type CalcDiscountFn = (originalPrice: number, discountPercent: number) => number;
type FormatProductFn = (name: string, price: number, available: boolean) => string;
type AddTagsFn = (existingTags: string[], newTags: string[]) => string[];
type IsExpensiveFn = (price: number) => boolean;

const _check1: CalcDiscountFn = calculateDiscount;
const _check2: FormatProductFn = formatProduct;
const _check3: AddTagsFn = addTags;
const _check4: IsExpensiveFn = isExpensive;
