class ApiError extends Error {
  constructor(status, message, alreadyExists = false) {
    super();
    this.status = status;
    this.message = message;
    this.alreadyExists = alreadyExists;
  }

  static badRequest(message, alreadyExists) {
    return new ApiError(404, message, alreadyExists);
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  // для сетевых ошибок
}

export default ApiError;
