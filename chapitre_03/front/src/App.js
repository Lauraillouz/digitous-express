import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [img, setImg] = useState();
  const [username, setUsername] = useState();
  const [users, setUsers] = useState();

  const getUsers = () => {
    fetch("http://localhost:3000/", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.users);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log("img is", img);
  }, [img]);

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

    setUsers([...users, { name: username, image: img }]);
  };

  return (
    <div>
      <div>
        <h3>Existing users: </h3>
        {users
          ? users.map((user) => {
              return (
                <div>
                  <p>{user.name}</p>
                </div>
              );
            })
          : null}
      </div>
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
