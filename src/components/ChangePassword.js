import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../Validations/UserValidation";
import { AccountContext } from "./Accounts";

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();
  const { getSession, authenticate } = useContext(AccountContext);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    let formData = {
      password: data.password,
      newPassword: data.new_password,
    };
    const isValid = await changePasswordSchema.isValid(formData);
    if (isValid) {
      getSession().then(({ user, email }) => {
        authenticate(email, data.password).then(() => {
          user.changePassword(
            data.password,
            data.new_password,
            (err, result) => {
              if (err) console.log(err);
              console.log(result);
            }
          );
        });
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="current-password"
          {...register("password")}
          placeholder="password"
        />
        <input
          type="current-password"
          {...register("new_password")}
          placeholder="new password"
        />
        <button type="submit"> Change password </button>
      </form>
    </div>
  );
};

export default ChangePassword;
