import { useState } from "react";
import { Redirect } from "react-router-dom";

const Opening = () => {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [RegisterRedirect, setRegisterRedirect] = useState(false);
  return (
    <div>
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
