// Exercise: Variable Type Annotations
//
// Add type annotations to these variable declarations.
// While TypeScript can infer these types, explicit annotations
// make your intent clear.

let username = "alice123";
let userAge = 28;
let isVerified = true;
let accountBalance = 1500.50;
let welcomeMessage = "Welcome to TypeScript Quest!";

// This function uses the variables above
function displayUserInfo() {
  console.log(`User: ${username}`);
  console.log(`Age: ${userAge}`);
  console.log(`Verified: ${isVerified}`);
  console.log(`Balance: $${accountBalance}`);
  console.log(welcomeMessage);
}

export { username, userAge, isVerified, accountBalance, welcomeMessage };
