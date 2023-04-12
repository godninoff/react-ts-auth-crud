import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// https:redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export const validEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const validPsw = /^[A-Za-z0-9]{4,16}$/;
export const validName = /[А-ЯЁA-Z][а-яёa-z]{1,15}$/;
export const urlPattern =
  // eslint-disable-next-line no-useless-escape
  /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
