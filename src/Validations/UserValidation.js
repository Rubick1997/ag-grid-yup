import * as yup from "yup";

export const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
export const changePasswordSchema = yup.object().shape({
  password: yup.string().required(),
  newPassword: yup.string().required(),
});
