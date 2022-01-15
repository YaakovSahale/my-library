import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styles from "../App.module.css";

const Opening = ({ setUserAuth }) => {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [RegisterRedirect, setRegisterRedirect] = useState(false);

  const localStorageUserAuth = JSON.parse(localStorage.getItem("userAuth"));
  useEffect(() => setUserAuth(localStorageUserAuth), []);
  return (
    <div className={styles.opening}>
      <section className={styles.openingSection}>
        <h1>welcome to Books Are Us</h1>
        <div className={styles.openingBtnDiv}>
          <button className={styles.openingBtn} onClick={() => setRegisterRedirect(true)}>Register</button>
          <button className={styles.openingBtn} onClick={() => setLoginRedirect(true)}>Login</button>
        </div>
      </section>

      {localStorageUserAuth ? <Redirect to={"/Discover"} /> : null}
      {RegisterRedirect ? <Redirect to={"/Register"} /> : null}
      {loginRedirect ? <Redirect to={"/Login"} /> : null}
    </div>
  );
};

export default Opening;
