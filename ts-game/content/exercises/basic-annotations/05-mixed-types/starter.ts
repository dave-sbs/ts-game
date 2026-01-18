// Exercise: Mixed Type Challenge
//
// This exercise combines everything you've learned about basic annotations.
// Add type annotations to all variables, parameters, and return types.

// Variables
let productName = "TypeScript Handbook";
let price = 29.99;
let inStock = true;
let tags = ["programming", "typescript", "education"];

// Functions
function calculateDiscount(originalPrice, discountPercent) {
  return originalPrice * (1 - discountPercent / 100);
}

function formatProduct(name, price, available) {
  const status = available ? "In Stock" : "Out of Stock";
  return `${name} - $${price.toFixed(2)} (${status})`;
}

function addTags(existingTags, newTags) {
  return [...existingTags, ...newTags];
}

function isExpensive(price) {
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
