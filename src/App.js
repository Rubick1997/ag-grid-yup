import { CognitoUserPool } from "amazon-cognito-identity-js";
import "./App.css";
import Table from "./Table";
import { userSchema } from "./Validations/UserValidation";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const poolData = {
    UserPoolId:process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID,
  };

  const UserPool = new CognitoUserPool(poolData);

  const createUser = async (data, event) => {
    event.preventDefault();
    let formData = {
      email: data.email,
      password: data.password,
    };
    const isValid = await userSchema.isValid(formData);
    if (!isValid) alert("No password or user");
    else
      UserPool.signUp(data.email, data.password, [], null, (err, data) => {
        if (err) console.log(err);
        console.log(data);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(createUser)}>
        <input type="text" {...register("email")} placeholder="email" />
        <input
          type="current-password"
          {...register("password")}
          placeholder="password"
        />
        <input type="submit" />
      </form>
      <Table />
    </div>
  );
}

export default App;
