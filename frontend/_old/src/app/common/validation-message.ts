export class ValidationMessage {
  key: string;
  format: (label?: string, error?: string) => string;
}
