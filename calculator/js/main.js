import { dom } from "./dom.js";
import { validateForm } from "./validation.js";
import { showErrors, clearErrors } from "./errors.js";

dom.form.addEventListener("submit", (e) => {
  e.preventDefault();

  clearErrors();

  const formValues = serializeData();
  const result = validateForm(formValues);

  if (!result.isValid) {
    showErrors(result.errors);
    return;
  }

  calculateNumbers(formValues);
});

function serializeData() {
  const formData = new FormData(dom.form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  return data;
}

function calculateNumbers(formValues) {
  let calculation = 0;

  if (formValues.operator === "+") {
    calculation = +formValues.firstNumber + +formValues.secondNumber;
  } else if (formValues.operator === "-") {
    calculation = +formValues.firstNumber - +formValues.secondNumber;
  } else if (formValues.operator === "*") {
    calculation = +formValues.firstNumber * +formValues.secondNumber;
  } else {
    calculation = +formValues.firstNumber / +formValues.secondNumber;
  }

  dom.result.textContent = `
    ${formValues.firstNumber} ${formValues.operator} ${formValues.secondNumber} = ${calculation}
    `;

  calculation = 0;
}

dom.resetButton.addEventListener("click", () => {
  dom.result.textContent = "Result will go here...";
  clearErrors()
});
