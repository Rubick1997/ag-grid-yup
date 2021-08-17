import "./App.css";
import Table from "./Table";
import { userSchema } from "./Validations/UserValidation";

function App() {
  const createUser = async (event) => {
    event.preventDefault();
    let formData = {
      name: event.target[0].value,
      email: event.target[1].value,
      data: event.target[2].value,
    };
    const isValid = await userSchema.isValid(formData);
    console.log(isValid)
  };

  return (
    <div className="App">
      <form onSubmit={createUser}>
        <input type="text" placeholder="Name..." />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <input type="submit" />
        <Table/>
      </form>


    </div>
  );
}

export default App;
