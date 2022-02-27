import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm/TodoForm";
import getId from "./util/generate.util";
import TodoList from "./components/TodoList/TodoList";

import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );

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
        ? { ...item, isEditMode: true, draftValue: item.text }
        : {
            ...item,
            isEditMode: false,
            text: !item.text.trim() ? item.draftValue : item.text,
          }
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
      item.id === id
        ? {
            ...item,
            isEditMode: false,
            text: !item.text.trim() ? item.draftValue : item.text,
          }
        : item
    );

    setTodoList(editedList);
  };

  const handleListItemDelete = (id) => (e) => {
    e.stopPropagation();

    setTodoList((prevState) => prevState.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const unload = () => {
      localStorage.setItem("list", JSON.stringify(todoList));
    };

    window.addEventListener("beforeunload", unload);

    return () => {
      window.removeEventListener("beforeunload", unload);
    };
  }, [todoList]);

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
        onListItemDelete={handleListItemDelete}
      />
    </div>
  );
}

export default App;
