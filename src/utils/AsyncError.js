const AppError = require("./AppError");

class AsyncErrors {
  dealWithAsyncErrors(error, request, response, next) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
    console.log(error);

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

module.exports = AsyncErrors;
