import { dom } from "./dom.js";

export function showErrors(errors) {
  Object.keys(errors).forEach((field) => {
    dom.errors[field].textContent = errors[field];
    dom.inputs[field].classList.add("invalid");
  });
}

export function clearErrors() {
  Object.keys(dom.errors).forEach((field) => {
    dom.errors[field].textContent = "";
    dom.inputs[field].classList.remove("invalid");
  });
}
