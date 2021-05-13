import RideError from "./CasimirError";
import { ErrorCodesEnum } from "../../graphql/allTypes/ErrorCodes";
export default class ForbiddenError extends RideError {
  constructor(...args: any[]) {
    super(403, ...args);
    Error.captureStackTrace(this, ForbiddenError);
  }
}

export const requiredFieldError = () => {
  return new ForbiddenError(ErrorCodesEnum.FIELD_IS_REQUIRED);
};