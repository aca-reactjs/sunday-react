function TodoForm({ onFormSubmit, inputValue, onInputChange }) {
  return (
    <form className="todoForm" onSubmit={onFormSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        className="todoForm-input"
      />
      <button className="add">Add</button>
    </form>
  );
}

export default TodoForm;
