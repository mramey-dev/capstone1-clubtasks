export const getAllTasks = () => {
  return fetch(`http://localhost:8088/tasks`).then((res) => res.json());
};
