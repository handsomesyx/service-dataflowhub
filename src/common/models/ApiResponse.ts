export class ApiResponse<T> {
  code: number;
  message: string;
  data: T | undefined;
  timestamp: string;

  constructor(code = 200, message = 'success', data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T) {
    return new ApiResponse<T>(200, 'Success', data);
  }

  static badRequest<T>(message = 'Bad Request', data?: T) {
    return new ApiResponse<T>(400, message, data);
  }

  static unauthorized<T>(message = 'Unauthorized', data?: T) {
    return new ApiResponse<T>(401, message, data);
  }

  static notFound<T>(message = 'Not Found', data?: T) {
    return new ApiResponse<T>(404, message, data);
  }

  static internalError<T>(message = 'Internal Server Error', data?: T) {
    return new ApiResponse<T>(500, message, data);
  }

  // 添加其他常见的错误响应...
}
