class ApiError extends Error {

  constructor(code, message , errors) {
    super(message);
    this.code = code;
    this.errors = errors;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

module.exports = ApiError;
