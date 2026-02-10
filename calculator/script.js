function validateInput(event) {
  var allowedKeyCodes = [
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105, // Numbers 0-9
    187,
    189,
    107,
    109,
    106,
    111,
    190,
    191, // Operators: + - * /
    8,
    46,
    37,
    38,
    39,
    40, // Backspace, Delete, Arrow keys
  ];

  var restrictedSymbols = ["!", "@", "#", "$", "^", "&", "_", "=", "?"];

  var keyCode = event.keyCode || event.which;

  console.log(keyCode);

  if (
    !allowedKeyCodes.includes(keyCode) ||
    restrictedSymbols.includes(event.key)
  ) {
    event.preventDefault();
    return;
  }

  // Check for existing decimal point in the input
  var existingDecimal = event.target.value.indexOf(".");

  if (keyCode === 190 && existingDecimal !== -1) {
    // Prevent entering another decimal point
    event.preventDefault();
    return;
  }

  if (
    event.target.value.length === 0 &&
    (keyCode === 187 ||
      keyCode === 189 ||
      keyCode === 107 ||
      keyCode === 109 ||
      keyCode === 106 ||
      keyCode === 111 ||
      keyCode === 191 ||
      event.key === "%" ||
      event.key === "*")
  ) {
    event.preventDefault();
    return;
  }

  // Check for consecutive operator presses
  if (event.target.value.length > 0) {
    var lastChar = event.target.value[event.target.value.length - 1];
    if (
      (lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "*" ||
        lastChar === "/" ||
        lastChar === "%" ||
        lastChar === "*") &&
      (keyCode === 187 ||
        keyCode === 189 ||
        keyCode === 107 ||
        keyCode === 109 ||
        keyCode === 106 ||
        keyCode === 111 ||
        keyCode === 191 ||
        event.key === "%" ||
        event.key === "*")
    ) {
      event.preventDefault();
      return;
    }
  }
}

const numberKeys = document.querySelectorAll(".number");

numberKeys.forEach((numberKey) => {
  numberKey.addEventListener("click", (e) => {
    let numValue = e.target.value;
    let keyCode = numValue.charCodeAt(0);

    console.log(keyCode);

    document.querySelector("input").focus();
    document.querySelector("input").value += numValue;
  });
});

const operatorKeys = document.querySelectorAll(".operator");

operatorKeys.forEach((operatorKey) => {
  operatorKey.addEventListener("click", (e) => {
    if (document.querySelector("input").value === "") {
      e.preventDefault();
      return;
    }
  });
});
