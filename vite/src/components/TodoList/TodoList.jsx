import "./TodoList.css";

function TodoList({
  todoList,
  onListItemClick,
  onListItemChange,
  onListItemFormSubmit,
  onListItemDelete,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h2 className="todoList-header">Todo list</h2>
      <ul className="todoList">
        {todoList.map(({ id, text, isEditMode }) => (
          <li onClick={onListItemClick(id)} className="todoList-item" key={id}>
            {isEditMode ? (
              <form onSubmit={onListItemFormSubmit(id)}>
                <input
                  onBlur={onListItemFormSubmit(id)}
                  className="todoListItem-input"
                  value={text}
                  onChange={onListItemChange(id)}
                />
              </form>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{text}</span>
                <span
                  className="todoItem-delete"
                  onClick={onListItemDelete(id)}
                >
                  X
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
