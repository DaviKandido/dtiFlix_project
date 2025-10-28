interface ErrorDetail {
  path: string;
  message: string[] | string;
}

class ApiError extends Error {
  public statusCode: number;
  public errors: ErrorDetail[] | ErrorDetail | null;

  constructor(statusCode: number, message: string , errors: ErrorDetail | ErrorDetail[] | null = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // Configura o protótipo para funcionar com classes estendidas em ES6+
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
