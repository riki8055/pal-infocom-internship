export function createSuccessMessage(message, duration = 5000) {
  return {
    message,
    duration,
    id: Date.now(),
  };
}
