export const getAdminUsers = () => {
  return fetch(`http://localhost:8088/users?role=manager`).then((res) =>
    res.json(),
  );
};

export const getStandardUsers = () => {
  return fetch(`http://localhost:8088/users?role=clubkeep`).then((res) =>
    res.json(),
  );
};
