export class ValidCheckResult {
  isValid: boolean;
  errorString: string;
  errorType: object;
  constructor(valid: boolean, error?: string, type?: object) {
    this.isValid = valid;
    this.errorString = error;
    this.errorType = type;
  }
}

export class CalculatorResult {
  isValid: boolean;
  result: string;
  errorString: string;
  errorType: object;
  constructor(valid: boolean, result?: string, errorString?: string, errorType?: object) {
    this.isValid = valid;
    this.result = result;
    this.errorString = errorString;
    this.errorType = errorType;
  }
}
