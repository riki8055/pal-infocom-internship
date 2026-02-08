import { dom } from "./dom.js";
import { validateForm } from "./validation.js";

dom.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const result = validateForm(dom.link.value);

  if (!result.isValid) {
    dom.link.classList.add("invalid");
    if (result.type === "emptyField") {
      dom.error.textContent = "Please add a link";
      return;
    }

    if (result.type === "invalidFormat") {
      dom.error.textContent = "Link is not valid";
      return;
    }
  } else {
    dom.link.classList.remove("invalid");
    dom.error.textContent = "";
  }
});
