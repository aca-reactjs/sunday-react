import { Component, useState } from "react";
import "./App.css";

const generateIds = () => {
  let count = 0;

  return () => {
    count += 1;

    return count;
  };
};

const getId = generateIds();

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleFormInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTodoFormSubmit = (e) => {
    e.preventDefault();

    const listItem = {
      text: inputValue,
      id: getId(),
    };

    setTodoList((prevState) => [...prevState, listItem]);
    setInputValue("");
  };

  return (
    <div className="app">
      <form className="todoForm" onSubmit={handleTodoFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleFormInputChange}
          className="todoForm-input"
        />
        <button className="add">Add</button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h2>Todo list</h2>
        <ul className="todoList">
          {todoList.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
