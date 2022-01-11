import { useState } from "react";
import { Redirect } from "react-router-dom";
import styles from "../App.module.css";
import axios from "axios";

const Login = ({ userAuth, setUserAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [serverError, setServerError] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    setServerError("")

    const FIREBASE_API_KEY = "AIzaSyCBpR8lmShutluv7AkGrMmW3FzY7vB7KKg";
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

    if (password.length < 6) return setPasswordError(true);
    else setPasswordError(false);

    if (!email.includes(".com")) return setEmailError(true);
    else setEmailError(false);

    axios
      .post(URL, { email, password })
      .then((data) => {
        setUserAuth(data);
      })
      .catch((err) => {
        console.dir(err);
        setServerError(err.response.data.error.message);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value={"Login"} />
      </form>
      {passwordError ? (
        <p className={styles.errorForm}>
          password must be at least 6 characters long
        </p>
      ) : null}
      {emailError ? (
        <p className={styles.errorForm}>password must includes ".com"</p>
      ) : null}
      {serverError ? <p className={styles.errorForm}>{serverError}</p> : null}
      {userAuth ? <Redirect to={"/Discover"} /> : null}
    </div>
  );
};

export default Login;
