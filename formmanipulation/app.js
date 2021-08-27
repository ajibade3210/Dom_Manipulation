const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");

const form = document.querySelector("#signup");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

// here we develop util function reusable functions
//checjk if placeholder is empty
const isRequired = (value) => (value === "" ? false : true);

//length of rgument
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

//check email
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//check password
const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

//alert error
const showError = (input, message) => {
  //get the formField
  const formField = input.parentElement;
  //add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  //show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  //get form-field
  const formField = input.parentElement;

  //remove error classList
  formField.classList.remove("error");
  formField.classList.add("success");

  //hide error msg
  const error = formField.querySelector("small");
  error.textContent = "";
};

//Validating Each input field
const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;

  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

//Validate the email field
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email Is Not Valid");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

//Validate the password field
const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

//Validate the confirm password field
const checkConfirmPassword = () => {
  let valid = false;
  //check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please Enter The Password Again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "Confirm Password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }
  return valid;
};

//Submit addEventListener
form.addEventListener("submit", function (e) {
  //prevent form from submitting
  e.preventDefault();

  //Validate forms
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to server if form is valid
  if (isFormValid) {
  }
});

//instant feed back
form.addEventListener("input", function (e) {
  switch (e.target.id) {
    case "username":
      checkUsername();
      break;
    case "email":
      checkEmail();
      break;
    case "password":
      checkPassword();
      break;
    case "confirm-password":
      checkConfirmPassword();
      break;
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);
