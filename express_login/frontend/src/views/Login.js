import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// CSS
import "../global.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canAccess, setCanAccess] = useState(false);

  const history = useHistory();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    history.push("/admin");
    setCanAccess(true);
  };

  return (
    <form className="flexForm width">
      <label>Email</label>
      <input type="email" onChange={onEmailChange} />

      <label>Password</label>
      <input type="password" onChange={onPasswordChange} />

      <button type="submit" onClick={handleClick}>
        Submit
      </button>
    </form>
  );
};

export default Login;
