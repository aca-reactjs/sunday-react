import "./TodoList.css";

function TodoList({
  todoList,
  onListItemClick,
  onListItemChange,
  onListItemFormSubmit,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h2>Todo list</h2>
      <ul className="todoList">
        {todoList.map(({ id, text, isEditMode }) => (
          <li onClick={onListItemClick(id)} className="todoList-item" key={id}>
            {isEditMode ? (
              <form onSubmit={onListItemFormSubmit(id)}>
                <input value={text} onChange={onListItemChange(id)} />
              </form>
            ) : (
              <span>{text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
