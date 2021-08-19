import React, { useContext } from "react";
import { AccountContext } from "./Accounts";
import { userSchema } from "../Validations/UserValidation";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const { authenticate, isLoggedIn } = useContext(AccountContext);

  const signUser = async (data, event) => {
    event.preventDefault();
    let formData = {
      email: data.email,
      password: data.password,
    };
    const isValid = await userSchema.isValid(formData);
    if (!isValid) {
      alert("No password or email");
      return;
    } else {
      authenticate(data.email, data.password).catch((err) => {
        console.log("Faled to Login!", err);
      });
    }
  };

  return (
    <>
      {!isLoggedIn && (
        <form onSubmit={handleSubmit(signUser)}>
          <input type="text" {...register("email")} placeholder="email" />
          <input
            type="current-password"
            {...register("password")}
            placeholder="password"
          />
          <button type="submit"> Login </button>
        </form>
      )}
    </>
  );
};

export default Login;
