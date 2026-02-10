export function validateForm(values) {
  const errors = {};

  // First number validation
  if (!values.firstNumber) {
    errors.firstNumber = "First number is required";
  }

  //   Operator validation
  if (!values.operator) {
    errors.operator = "Please select operator";
  }

  // Second number validation
  if (!values.secondNumber) {
    errors.secondNumber = "Second number is required";
  }

//   Divisible by zero validation
if(values.operator === '/' && values.secondNumber === '0') {
    errors.secondNumber = "Cannot divide by zero."
}

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
