
const hardcodedUsername = "user";
const hardcodedPassword = "password";


function validateLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("loginErrorMessage");

  if (username === hardcodedUsername && password === hardcodedPassword) {
    errorMessage.textContent = "";
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("currencyConverter").style.display = "block";
  } else {
    errorMessage.textContent = "Login failed. Please check your credentials.";
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const conversionResult = document.getElementById("conversionResult");
  const apiErrorMessage = document.getElementById("apiErrorMessage");

  
  conversionResult.textContent = "";
  apiErrorMessage.textContent = "";

  if (isNaN(amount) || amount <= 0) {
    apiErrorMessage.textContent = "Please enter a valid amount.";
    return;
  }

  
  const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();

    
    if (!data.rates[toCurrency]) {
      apiErrorMessage.textContent = "Conversion rate not available.";
      return;
    }

    const rate = data.rates[toCurrency];
    const convertedAmount = amount * rate;

    conversionResult.textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    apiErrorMessage.textContent = "Failed to fetch conversion rate. Please try again later.";
    console.error("Error:", error);
  }
}
