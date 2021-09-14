import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// Components
import Login from "./Login";
// CSS
import "../global.css";

const passwordSchema = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [canLogin, setCanLogin] = useState(false);

  const history = useHistory();

  const setupFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const setupSurname = (e) => {
    setSurname(e.target.value);
  };
  const setupDateBirth = (e) => {
    setDateOfBirth(e.target.value);
  };
  const setupEmail = (e) => {
    setEmail(e.target.value);
  };
  const setupPassword = (e) => {
    setPassword(e.target.value);
  };
  const setupConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleClick = () => {
    const ispAsswordValid = passwordSchema.test(password);
    const isConfirmPasswordValid = password === confirmPassword;
    console.log("ispAsswordValid", ispAsswordValid);
    console.log("isConfirmPasswordValid", isConfirmPasswordValid);

    if (ispAsswordValid && isConfirmPasswordValid) {
      fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          surname: surname,
          dateOfBirth: dateOfBirth,
          email: email,
          password: password,
        }),
      });
      history.push("/login");
      setCanLogin(true);
    } else {
      alert("Your form is invalid");
    }
  };

  return (
    <div>
      {!canLogin ? (
        <form className="flexForm width">
          <label>First name</label>
          <input type="text" onChange={setupFirstName} />

          <label>Surname</label>
          <input type="text" onChange={setupSurname} />

          <label>Date of birth</label>
          <input type="date" onChange={setupDateBirth} />

          <label>Email</label>
          <input
            type="email"
            onChange={setupEmail}
            placeholder="example@test.com"
          />

          <label>Password</label>
          <input type="password" onChange={setupPassword} />
          <p className="password-details">
            Must contain 1 uppercase, 1 lowercase, 1 digit and be over 8
            characters
          </p>

          <label>Confirm password</label>
          <input type="password" onChange={setupConfirmPassword} />

          <button type="submit" onClick={handleClick}>
            Submit
          </button>
        </form>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Signup;
