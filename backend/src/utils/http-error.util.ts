/**
 * Lỗi nghiệp vụ mang sẵn HTTP status code để errorHandler (middleware) trả response đồng nhất.
 */
export class HttpError extends Error {
  public readonly status: number;
  public readonly code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
    // Bắt buộc trong TypeScript khi target CommonJS/ES5 để `err instanceof HttpError` luôn đúng
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

