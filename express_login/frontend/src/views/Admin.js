import React, { useState, useEffect } from "react";

const Admin = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    fetch("http://localhost:3001/admin", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.data);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div>
      <h2>Registered users:</h2>
      {users
        ? users.map((user) => {
            return (
              <div>
                <p>First name: {user.firstName}</p>
                <p>Surname: {user.surname}</p>
                <p>Age: {user.dateOfBirth}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Admin;
