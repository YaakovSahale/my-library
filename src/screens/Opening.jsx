import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const Opening = ({ setUserAuth }) => {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [RegisterRedirect, setRegisterRedirect] = useState(false);

  const localStorageUserAuth = JSON.parse(localStorage.getItem("userAuth"));
  useEffect(() => setUserAuth(localStorageUserAuth), []);
  return (
    <div>
      {localStorageUserAuth ? <Redirect to={"/Discover"} /> : null}
      <h1>Opening Page</h1>
      <section>
        <button onClick={() => setRegisterRedirect(true)}>Register</button>
        <button onClick={() => setLoginRedirect(true)}>Login</button>
      </section>

      {RegisterRedirect ? <Redirect to={"/Register"} /> : null}
      {loginRedirect ? <Redirect to={"/Login"} /> : null}
    </div>
  );
};

export default Opening;
