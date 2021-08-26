/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(404, message);
  }

  static conflictRequest(message) {
    return new ApiError(409, message);
  }

  static internal(message) {
    return new ApiError(500, message);
  }
}

export default ApiError;
