import React, { useContext } from "react";
import { UserPool } from "../UserPool";
import { userSchema } from "../Validations/UserValidation";
import { useForm } from "react-hook-form";
import { AccountContext } from "./Accounts";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const { isLoggedIn } = useContext(AccountContext);
  const createUser = async (data, event) => {
    event.preventDefault();
    let formData = {
      email: data.email,
      password: data.password,
    };
    const isValid = await userSchema.isValid(formData);
    if (!isValid) alert("No password or email");
    else
      UserPool.signUp(data.email, data.password, [], null, (err, data) => {
        if (err) console.log(err);
        console.log(data);
      });
  };

  return (
    <>
      {!isLoggedIn && (
        <form onSubmit={handleSubmit(createUser)}>
          <input type="text" {...register("email")} placeholder="email" />
          <input
            type="current-password"
            {...register("password")}
            placeholder="password"
          />
          <button type="submit"> Sign Up </button>
        </form>
      )}
    </>
  );
};

export default SignUp;
