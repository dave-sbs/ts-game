// Solution: Mixed Type Challenge

// Variables
let productName: string = "TypeScript Handbook";
let price: number = 29.99;
let inStock: boolean = true;
let tags: string[] = ["programming", "typescript", "education"];

// Functions
function calculateDiscount(originalPrice: number, discountPercent: number): number {
  return originalPrice * (1 - discountPercent / 100);
}

function formatProduct(name: string, price: number, available: boolean): string {
  const status = available ? "In Stock" : "Out of Stock";
  return `${name} - $${price.toFixed(2)} (${status})`;
}

function addTags(existingTags: string[], newTags: string[]): string[] {
  return [...existingTags, ...newTags];
}

function isExpensive(price: number): boolean {
  return price > 50;
}

// Usage
const discountedPrice = calculateDiscount(price, 10);
const productInfo = formatProduct(productName, discountedPrice, inStock);
const allTags = addTags(tags, ["bestseller"]);
const expensive = isExpensive(price);

export { 
  productName, 
  price, 
  inStock, 
  tags, 
  calculateDiscount, 
  formatProduct, 
  addTags, 
  isExpensive 
};
