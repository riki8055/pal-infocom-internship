export const dom = {
  form: document.querySelector("form"),
  inputs: {
    firstNumber: document.getElementById("firstNumber"),
    operator: document.getElementById("operator"),
    secondNumber: document.getElementById("secondNumber"),
  },
  errors: {
    firstNumber: document.querySelector("#firstNumber + .error"),
    operator: document.querySelector("#operator + .error"),
    secondNumber: document.querySelector("#secondNumber + .error"),
  },
  submitButton: document.querySelector("button[type='submit']"),
  resetButton: document.querySelector("button[type='reset']"),
  result: document.querySelector(".result"),
};

if (!dom.form) {
  throw new Error("Form element not found");
}
