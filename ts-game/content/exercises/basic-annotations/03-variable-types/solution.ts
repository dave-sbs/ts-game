// Solution: Variable Type Annotations

let username: string = "alice123";
let userAge: number = 28;
let isVerified: boolean = true;
let accountBalance: number = 1500.50;
let welcomeMessage: string = "Welcome to TypeScript Quest!";

// This function uses the variables above
function displayUserInfo() {
  console.log(`User: ${username}`);
  console.log(`Age: ${userAge}`);
  console.log(`Verified: ${isVerified}`);
  console.log(`Balance: $${accountBalance}`);
  console.log(welcomeMessage);
}

export { username, userAge, isVerified, accountBalance, welcomeMessage };
