import { ValidationMessage } from "./validation-message";

export const VALIDATION_MESSAGE_DEFAULTS: ValidationMessage[] = [
  {key: "email", format: () => "Please enter a valid email address"},
  {key: "required", format: () => "This is a required field"},
  {key: "date", format: () => "Please enter a valid date in format DD/MM/YYYY"},
  {key: "australianPostcode", format: () => "Please enter a valid postcode"},
  {key: "year", format: () => "Please enter a valid year."},
  {key: "currentOrFutureYear", format: () => "Must be current year or future."},
  {key: "currentOrPastDate", format: () => "Date cannot be in the future."},
  {key: "dateWithinNextYear", format: () => "Date cannot be more than 12 months in the future."},
  {key: "usiValidFormat", format: () => "Must be valid USI format."}
];
