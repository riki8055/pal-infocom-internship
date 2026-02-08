export function validateForm(link) {
  if (!link.trim()) {
    return {
      isValid: false,
      type: "emptyField",
    };
  }

  if (!isValidLink(link.trim())) {
    return {
      isValid: false,
      type: "invalidFormat",
    };
  }

  return {
    isValid: true,
    type: null,
  };
}

function isValidLink(url) {
  const regex = /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;
  return regex.test(url);
}
