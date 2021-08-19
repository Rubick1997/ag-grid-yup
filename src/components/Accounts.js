import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import React, { createContext, useState } from "react";
import { UserPool } from "../UserPool";

export const AccountContext = createContext();

const Accounts = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      setIsLoggedIn(false);
    }
  };

  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject();
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};
                  attributes.forEach(
                    ({ Name, Value }) => (results[Name] = Value)
                  );
                  resolve(results);
                }
              });
            });
            resolve({ user, ...session, ...attributes });
          }
        });
      } else {
        reject();
      }
    });

  const authenticate = async (email, password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          setIsLoggedIn(true);
          console.log("onSuccess:", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.log("onFailure:", err);
          reject(err);
        },

        newPasswordRequired: (data) => {
          console.log("newPasswordRequired:", data);
          resolve(data);
        },
      });
    });
  };
  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default Accounts;
