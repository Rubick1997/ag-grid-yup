import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Accounts";

const Status = () => {
  const { getSession, logout, isLoggedIn, setIsLoggedIn } =
    useContext(AccountContext);

  useEffect(() => {
    getSession().then(() => {
      setIsLoggedIn(true);
    });
  }, [getSession,setIsLoggedIn,isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          You are Logged in <button onClick={logout}>Logout</button>
        </div>
      ) : (
        "Please login below"
      )}
    </div>
  );
};

export default Status;
