import React from "react";
// CSS
import "../global.css";

const Login = () => {
  return (
    <form className="flexForm width">
      <label>Email</label>
      <input type="email" />

      <label>Password</label>
      <input type="password" />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
