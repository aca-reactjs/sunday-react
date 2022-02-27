import { Component } from "react";
import "./App.css";

const generateIds = () => {
  let count = 0;

  return () => {
    count += 1;

    return count;
  };
};

const getId = generateIds();

class App extends Component {
  state = {
    inputValue: "",
    todoList: [],
  };

  handleFormInputChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      inputValue: e.target.value,
    }));
  };

  handleTodoFormSubmit = (e) => {
    e.preventDefault();

    const listItem = {
      text: this.state.inputValue,
      id: getId(),
    };

    this.setState((prevState) => ({
      ...prevState,
      todoList: [...prevState.todoList, listItem],
      inputValue: "",
    }));
  };

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleTodoFormSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleFormInputChange}
          />
          <button className="add">Add</button>
        </form>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <h2>Todo list</h2>
          <ul className="todoList">
            {this.state.todoList.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
