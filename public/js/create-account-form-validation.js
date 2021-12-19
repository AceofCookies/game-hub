
const FORWARD_TO = "account.html";

const FORM = document.querySelector("#create-account-form");
const EMAIL_FIELD = document.querySelector("#email");
const INPUTS = document.querySelectorAll("#create-account-form input");
const BUTTON = document.querySelector("#create-account-form [type=submit]");

// Updates the error text below an input to the input validation error message
// produced by the browser.
function updateInputErrorText(input) {
  let nextSibling = input.nextElementSibling;

  if (nextSibling.classList.contains("error"))
    nextSibling.innerText = input.validationMessage;
}

// This prevents the default "invalid" event on all the inputs, which prevents
// the default validation popup from being displayed.
INPUTS.forEach((input) => {
  input.addEventListener("invalid", (e) => e.preventDefault());
  input.addEventListener("input", (e) => updateInputErrorText(input));
});

BUTTON.addEventListener("click", (e) => {
  e.preventDefault();

  FORM.classList.add("validated");

  if (!EMAIL_FIELD.validity.valid) {
    let nextSibling = EMAIL_FIELD.nextElementSibling;

    // Delete the help text under the email field if there are any errors,
    // since it's in the way.
    if (!nextSibling.classList.contains("error"))
      nextSibling.remove();
  }

  INPUTS.forEach((input) => updateInputErrorText(input));

  if (FORM.checkValidity()) window.location = FORWARD_TO;
});
