import { createContext, useState } from "react";
//import { useNavigate } from "react-router-dom";

const ValidUserContext = createContext({
  isLoggedIn: false,
  apiAuthCheck: (enteredEmail, enteredPassword) => {},
  localAuthCheck: () => {},
});

export const ValidUserContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function apiAuthCheckHandler(enteredEmail, enteredPassword) {
    const url =
      "https://802ss8lnr3.execute-api.us-east-1.amazonaws.com/prod/users";
    await fetch(url, {mode:'cors'})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Old
        const validUsers = [];

        var users = data.body;
        for (const key in users) {
          const validUser = {
            id: key,
            ...users[key],
          };
          validUsers.push(validUser);
        }
        const authUser = validUsers.find(
          (user) =>
            user.user === enteredEmail && user.password === enteredPassword
        );
        if (authUser !== undefined) {
          localStorage.setItem("login-data", JSON.stringify(authUser));
          setIsLoggedIn(authUser);
          alert("Logged in!");
        } else {
          alert("Authentication failed!");
        }
        //Old end
      })
      .catch((e) => {
        alert("Server error");
      });
  }

  const localAuthCheckHandler = () => {
    const localData = JSON.parse(localStorage.getItem("login-data"));
    if (localData !== null) {
      setIsLoggedIn(true);
    }
  };

  const context = {
    isLoggedIn: isLoggedIn,
    apiAuthCheck: apiAuthCheckHandler,
    localAuthCheck: localAuthCheckHandler,
  };

  return (
    <ValidUserContext.Provider value={context}>
      {props.children}
    </ValidUserContext.Provider>
  );
};

export default ValidUserContext;
