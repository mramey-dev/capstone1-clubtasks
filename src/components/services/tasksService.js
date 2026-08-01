export const getAllTasks = () => {
  return fetch(`http://localhost:8088/tasks`).then((res) => res.json());
};

export const getTaskById = (taskId) => {
  return fetch(`http://localhost:8088/tasks/${taskId}`).then((res) =>
    res.json(),
  );
};

export const updateTask = (task) => {
  return fetch(`http://localhost:8088/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

export const deleteTask = (task) => {
  return fetch(`http://localhost:8088/tasks/${task.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createTask = (task) => {
  return fetch(`http://localhost:8088/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};
