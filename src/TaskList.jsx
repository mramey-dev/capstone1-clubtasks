import { useEffect, useState } from "react";
import { getAllTasks } from "./components/services/tasksService";
import { TaskRow } from "./components/TaskRow.jsx";

export const TaskList = () => {
  const [allTasks, setAllTasks] = useState([]);

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
          return <TaskRow key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};
