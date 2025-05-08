const accountTypeSelect = document.getElementById("account_type");
const fullNameLabel = document.getElementById("full_name_label");
const fullNameInput = document.getElementById("full_name");
const companyFields = document.querySelector(".company-fields");
const contactName = document.getElementById("contact-name-container");
const contactTitle = document.getElementById("contact-title-container");
const fullName = document.getElementById("full-name-container");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const phoneNumberInput = document.getElementById("phone_number");
const emailInput = document.getElementById("email");
const contactTitleInput = document.getElementById("contact_title");
const contactNameInput = document.getElementById("contact_name");
const registrationForm = document.getElementById("registration-form");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const fullNameError = document.getElementById("fullNameError");
const phoneNumberError = document.getElementById("phoneNumberError");
const emailError = document.getElementById("emailError");
const contactNameError = document.getElementById("contactNameError");
const contactTitleError = document.getElementById("contactTitleError");

accountTypeSelect.addEventListener("change", function () {
  if (this.value === "company") {
    contactName.style.display = "block";
    contactTitle.style.display = "block";
    fullName.style.display = "none";
  } else {
    contactName.style.display = "none";
    contactTitle.style.display = "none";
    fullName.style.display = "block";
  }
});

/* 
    The following functions will validate the user input to each form element
    as the user is entering the informaiton.
*/

function validateUsername() {
  if (usernameInput.value.trim() === "") {
    usernameError.textContent = "Username is required.";
    return false;
  } else if (usernameInput.value.trim().length < 3) {
    usernameError.textContent = "Username must be at least 3 characters long.";
    return false;
  } else {
    usernameError.textContent = "";
    return true;
  }
}

function validatePassword() {
  if (passwordInput.value === "") {
    passwordError.textContent = "Password is required.";
    return false;
  } else if (passwordInput.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters long.";
    return false;
  } else {
    passwordError.textContent = "";
    return true;
  }
}

function validateFullName() {
  if (fullNameInput.value.trim() === "") {
    fullNameError.textContent = "Full Name is required.";
    return false;
  } else {
    fullNameError.textContent = "";
    return true;
  }
}

function validateContactName() {
  if (
    accountTypeSelect.value === "company" &&
    contactNameInput.value.trim() === ""
  ) {
    contactNameError.textContent =
      "Contact Name is required for company accounts.";
    return false;
  } else {
    contactNameError.textContent = "";
    return true;
  }
}

function validateContactTitle() {
  if (
    accountTypeSelect.value === "company" &&
    contactTitleInput.value.trim() === ""
  ) {
    contactTitleError.textContent =
      "Contact Title is required for company accounts.";
    return false;
  } else {
    contactTitleError.textContent = "";
    return true;
  }
}

function validatePhoneNumber() {
  const phoneRegex =
    /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (
    phoneNumberInput.value.trim() !== "" &&
    !phoneRegex.test(phoneNumberInput.value)
  ) {
    phoneNumberError.textContent = "Invalid phone number format.";
    return false;
  } else {
    phoneNumberError.textContent = "";
    return true;
  }
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email Address is required.";
    return false;
  } else if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = "Invalid email address format.";
    return false;
  } else {
    emailError.textContent = "";
    return true;
  }
}

usernameInput.addEventListener("keyup", validateUsername);
passwordInput.addEventListener("keyup", validatePassword);
fullNameInput.addEventListener("keyup", validateFullName);
phoneNumberInput.addEventListener("keyup", validatePhoneNumber);
emailInput.addEventListener("keyup", validateEmail);
contactNameInput.addEventListener("keyup", validateContactName);
contactTitleInput.addEventListener("keyup", validateContactTitle);
accountTypeSelect.addEventListener("change", function () {
  validateFullName(); // Re-validate full name label
  validateContactTitle(); // Validate contact title visibility
});

registrationForm.addEventListener("submit", function (event) {
  let isValid = true;
  if (!validateUsername()) isValid = false;
  if (!validatePassword()) isValid = false;
  if (!validatePhoneNumber()) isValid = false;
  if (!validateEmail()) isValid = false;

  if (!isValid) {
    event.preventDefault(); // Prevent form submission if there are errors
  }
});

/*
    The following code block gathers relavent html elements, 
    and will dynamically change the form according to the account type chosen by the user.
*/
