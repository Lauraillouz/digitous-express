import { useState, useEffect } from "react";
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
    fetch("http://localhost:3000/user", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div>
      <input type="text" onChange={handleChangeUser} />
      <div>
        <input type="file" onChange={handleChangeImg} />
        <button type="submit" onClick={handleClick}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
