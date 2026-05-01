export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export const badRequest = (message: string): HttpError => {
  return new HttpError(400, message);
};

export const unauthorized = (message = 'Unauthorized'): HttpError => {
  return new HttpError(401, message);
};

export const forbidden = (message = 'Forbidden'): HttpError => {
  return new HttpError(403, message);
};
