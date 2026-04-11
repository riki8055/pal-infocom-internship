export function validateSignup(data) {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email.includes("@")) {
    errors.email = "Invalid email";
  }

  if (data.password.length < 6) {
    errors.password = "Password must be 6 characters long";
  }

  return errors;
}
