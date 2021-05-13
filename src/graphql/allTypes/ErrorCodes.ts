import { enumType } from "nexus";

export enum ErrorCodesEnum {
    USER_DOES_NOT_EXISTS = "USER_DOES_NOT_EXISTS",
    FIELD_IS_REQUIRED='FIELD_IS_REQUIRED',
    LOGIN_FAILED_UNAUTHORIZED='LOGIN_FAILED_UNAUTHORIZED',
    INVALID_USER='INVALID_USER'
}

export const ErrorCodes = enumType({
    name: "ErrorCodes",
    members: Object.keys(ErrorCodesEnum)
  });