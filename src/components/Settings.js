import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Accounts";
import ChangePassword from "./ChangePassword";

const Settings = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { getSession } = useContext(AccountContext);
  const { isLoggedIn } = useContext(AccountContext);

  useEffect(() => {
    getSession().then(() => {
      setLoggedIn(isLoggedIn);
    });
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn && (
        <>
          <h1>Settings</h1>
          <ChangePassword />
        </>
      )}
    </div>
  );
};

export default Settings;
