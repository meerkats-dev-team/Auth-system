import { ZodError } from "zod";

export const formatZodError = (error: ZodError) => {
  const { fieldErrors } = error.formErrors;
  return fieldErrors;
};
