import { useState } from "react";

const emptyTask = {
  facilityId: "",
  description: "",
  taskCategory: "",
  priority: "",
  notes: "",
};

export const ClubTasksForm = ({ task, mode }) => {
  const [currentTask, setCurrentTask] = useState(
    mode === "edit" && task ? task : emptyTask,
  );

  return (
    <form>
      <h2>{mode === "edit" ? "Edit Task" : "Create Task"}</h2>

      <label>
        Description:
        <input
          type="text"
          value={currentTask.description}
          onChange={(event) => {
            setCurrentTask({
              ...currentTask,
              description: event.target.value,
            });
          }}
        />
      </label>
    </form>
  );
};
