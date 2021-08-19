import "./App.css";
import Accounts from "./components/Accounts";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Status from "./components/Status";

import Table from "./Table";

function App() {
  return (
    <Accounts>
      <div className="App">
        <Status />
        <SignUp />
        <Login />
        <Table />
      </div>
    </Accounts>
  );
}

export default App;
