export class LateCheckInValidationError extends Error {
  constructor() {
    super("Check-in can only be validade until 20 minutes of its creation.");
  }
}
