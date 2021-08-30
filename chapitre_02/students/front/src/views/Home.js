import React, { useState, useEffect } from "react";

const Home = () => {
  const [students, setStudents] = useState(null);
  const [newStudent, setNewStudent] = useState({});

  const getStudents = () => {
    fetch("http://localhost:3001/students")
      .then((res) => res.json())
      .then((res) => {
        setStudents(res.students);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/students", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newStudent }),
    })
      .then((res) => res.json())
      .then((res) => {
        setStudents([...students, res.newStudent]);
      });
    setNewStudent("");
  };

  const handleChange = (e) => {
    let newStudentInput = e.target.value;
    setNewStudent(newStudentInput);
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        <h2>Student List</h2>
        {students
          ? students.map((student) => {
              return (
                <div>
                  <p>{student.name}</p>
                </div>
              );
            })
          : null}
      </div>

      <h2>Add Student</h2>
      <form>
        <label>
          Student name
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <input type="submit" value="Add" onClick={handleClick} />
      </form>
    </div>
  );
};

export default Home;
