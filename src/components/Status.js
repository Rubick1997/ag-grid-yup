import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Accounts";

const Status = () => {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session:", session);
      setStatus(true);
    });
  }, [getSession, status]);

  const logOutHandler = () => {
    logout();
    setStatus((prevState) => !prevState);
  };

  return (
    <div>
      {status ? (
        <div>
          You are Logged in <button onClick={logOutHandler}>Logout</button>
        </div>
      ) : (
        "Please login below"
      )}
    </div>
  );
};

export default Status;
