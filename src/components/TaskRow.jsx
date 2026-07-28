export const TaskRow = ({ task }) => {
  return (
    <article className="task">
      <div>
        <strong>{task.description}</strong>
      </div>
      <div className="task-info">Category: {task.taskCategory}</div>
      <div className="task-info">Status: {task.status}</div>
      <div className="task-info">Priority: {task.priority}</div>
      <footer>
        <span>Opened: {task.dateOpened}</span>
      </footer>
    </article>
  );
};
