import { BadRequestError, ForbiddenError, NotFoundError } from "./errorTypes";

export const getStatusCode = (err: Error): number => {
  if (err instanceof BadRequestError) {
    return 400;
  }

  if (err instanceof ForbiddenError) {
    return 403;
  }

  if (err instanceof NotFoundError) {
    return 404;
  }

  return 500;
};
