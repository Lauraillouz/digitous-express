import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [img, setImg] = useState();
  const [username, setUsername] = useState();

  /*   useEffect(() => {
    console.log(img);
    console.log(username);
  }, [img, username]); */

  const handleChangeImg = (e) => {
    setImg(e.target.files[0]);
  };

  const handleChangeUser = (e) => {
    setUsername(e.target.value);
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("image", img);

    fetch(`http://localhost:3000/user/?name=${username}`, {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div>
      <label>Enter your username:</label>
      <input type="text" onChange={handleChangeUser} className="textInput" />
      <div>
        <label>Upload your profile pic: </label>
        <input type="file" onChange={handleChangeImg} />
      </div>
      <button type="submit" onClick={handleClick} className="btn">
        Send
      </button>
    </div>
  );
};

export default App;