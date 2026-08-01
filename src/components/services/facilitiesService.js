export const getAllFacilities = () => {
  return fetch(`http://localhost:8088/facilities`).then((res) => res.json());
};

export const getAllCities = () => {
  return fetch(`http://localhost:8088/cities`).then((res) => res.json());
};
export const getUserFacilities = (cityId) => {
  return fetch(`http://localhost:8088/facilities?=${cityId}`).then((res) =>
    res.json(),
  );
};
