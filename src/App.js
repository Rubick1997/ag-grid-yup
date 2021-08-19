import { useContext, useEffect } from "react";
import "./App.css";
import { AccountContext } from "./components/Accounts";
import Login from "./components/Login";
import Settings from "./components/Settings";
import SignUp from "./components/SignUp";
import Status from "./components/Status";

import Table from "./Table";

function App() {
  const { isLoggedIn } = useContext(AccountContext);

  useEffect(() => {}, [isLoggedIn]);

  return (
    <div className="App">
      <Status />
      <SignUp />
      <Login />
      <Settings />
      {isLoggedIn && <Table />}
    </div>
  );
}

export default App;
