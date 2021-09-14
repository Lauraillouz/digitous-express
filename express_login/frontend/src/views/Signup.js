import React from "react";
// CSS
import "../global.css";

const Signup = () => {
  return (
    <div>
      <form className="flexForm width">
        <label>First name</label>
        <input type="text" />

        <label>Surname</label>
        <input type="text" />

        <label>Date of birth</label>
        <input type="date" />

        <label>Email</label>
        <input type="email" />

        <label>Password</label>
        <input type="password" />

        <label>Confirm password</label>
        <input type="password" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
