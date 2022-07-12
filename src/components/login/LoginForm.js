import { useRef, useEffect, useContext } from "react";

import classes from "./LoginForm.module.scss";
import ValidUserContext from "../../authCheck";

let isInitial = true;

function LoginForm() {
  const validUserContext = useContext(ValidUserContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (isInitial) {
      validUserContext.localAuthCheck();
      isInitial = false;
    }
  }, [validUserContext]);

  const submitHandler = (event) => {
    event.preventDefault();

    validUserContext.apiAuthCheck(
      emailInputRef.current.value,
      passwordInputRef.current.value
    );
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div>
        <input
          className={classes.input}
          type="email"
          id="user-name"
          name="user-name"
          autoComplete="on"
          placeholder="Username or E-mail"
          ref={emailInputRef}
          required={!validUserContext.isLoggedIn}
        ></input>
      </div>

      <div>
        <input
          className={classes.input}
          type="password"
          id="user-password"
          name="user-password"
          autoComplete="off"
          placeholder="Password"
          ref={passwordInputRef}
          required={!validUserContext.isLoggedIn}
        ></input>
      </div>
      <button
        className={classes.loginBtn}
        disabled={validUserContext.isLoggedIn}
      >
        {validUserContext.isLoggedIn ? "Already logged in" : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
