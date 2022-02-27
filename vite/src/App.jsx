import { Component, useState } from "react";
import TodoForm from "./components/TodoForm/TodoForm";
import getId from "./util/generate.util";
import TodoList from "./components/TodoList/TodoList";

import "./App.css";

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
      isEditMode: false,
    };

    setTodoList((prevState) => [...prevState, listItem]);
    setInputValue("");
  };

  const handleListItemClick = (id) => () => {
    const editedList = todoList.map((item) =>
      item.id === id
        ? { ...item, isEditMode: true }
        : { ...item, isEditMode: false }
    );

    setTodoList(editedList);
  };

  const handleListItemChange = (id) => (e) => {
    const editedList = todoList.map((item) =>
      item.id === id ? { ...item, text: e.target.value } : item
    );

    setTodoList(editedList);
  };

  const handleListItemFormSubmit = (id) => (e) => {
    e.preventDefault();

    const editedList = todoList.map((item) =>
      item.id === id ? { ...item, isEditMode: false } : item
    );

    setTodoList(editedList);
  };

  return (
    <div className="app">
      <TodoForm
        inputValue={inputValue}
        onInputChange={handleFormInputChange}
        onFormSubmit={handleTodoFormSubmit}
      />
      <TodoList
        todoList={todoList}
        onListItemClick={handleListItemClick}
        onListItemChange={handleListItemChange}
        onListItemFormSubmit={handleListItemFormSubmit}
      />
    </div>
  );
}

export default App;
