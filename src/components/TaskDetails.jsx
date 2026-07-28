export const TaskDetails = ({ task }) => {
  return (
    <section className="task-details">
      <h2>Taks Details</h2>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Category:</strong> {task.taskCategory}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Date opened:</strong> {task.dateOpened}
      </p>
      <p>
        <strong>Notes:</strong> {task.notes || "No notes provided"}
      </p>
      <button type="button">Edit Task</button>
    </section>
  );
};
