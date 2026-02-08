export const dom = {
  form: document.querySelector("form"),
  link: document.querySelector("#link"),
  error: document.querySelector("#link + .error"),
  submitButton: document.querySelector("button[type='submit']"),
  shortenLinks: document.querySelector(".shorten-links"),
};

if (!dom.form) {
  throw new Error("Form element not found");
}
