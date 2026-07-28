import { useEffect, useState } from "react";
import { getAllTasks } from "./components/services/tasksService";
import { TaskRow } from "./components/TaskRow.jsx";
import { TaskDetails } from "./components/TaskDetails.jsx";
import { ClubTasksForm } from "./components/forms/ClubTasksForm.jsx";

export const TaskList = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  console.log(selectedTask);
  useEffect(() => {
    getAllTasks().then((tasksArray) => {
      setAllTasks(tasksArray);
    });
  }, []);

  return (
    <div className="tasks-container">
      <h2>Club Tasks</h2>

      <div className="tasks">
        {allTasks.map((task) => {
          return (
            <TaskRow
              key={task.id}
              task={task}
              onTaskSelected={setSelectedTask}
            />
          );
        })}
      </div>

      {selectedTask ? (
        <TaskDetails task={selectedTask} />
      ) : (
        <p>Select a task to view its details.</p>
      )}
      <ClubTasksForm mode="edit" task={selectedTask} />
    </div>
  );
};
