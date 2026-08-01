import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../services/tasksService.js";
import { TaskRow } from "./TaskRow.jsx";
import { TaskFilters } from "./TaskFilters.jsx";
import {
  getAllCities,
  getAllFacilities,
} from "../services/facilitiesService.js";
import { getAllUsers } from "../services/userService.js";

export const TaskList = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("clubTasks_user"));
  const [users, setUsers] = useState([]);

  const [allTasks, setAllTasks] = useState([]);
  const [filters, setFilters] = useState({
    facility: "all",
    status: "all",
    category: "all",
    myTasksOnly: false,
  });
  const [facilities, setFacilities] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAllUsers().then((usersArray) => {
      setUsers(usersArray);
    });
  }, []);

  useEffect(() => {
    getAllCities().then((citiesArray) => {
      setCities(citiesArray);
    });
  }, []);

  useEffect(() => {
    getAllTasks().then((tasksArray) => {
      setAllTasks(tasksArray);
    });
  }, []);

  useEffect(() => {
    getAllFacilities().then((facilitiesArray) => {
      const userFacilities = facilitiesArray.filter(
        (facility) => facility.cityId === loggedInUser.cityId,
      );

      setFacilities(userFacilities);
    });
  }, []);

  const handleClearFilters = () => {
    setFilters({
      facility: "all",
      status: "all",
      category: "all",
      myTasksOnly: false,
    });
  };

  const filteredTasks = allTasks.filter((task) => {
    const belongsToUserCity = facilities.some(
      (facility) => facility.id === task.facilityId,
    );

    const matchesMyTasks =
      !filters.myTasksOnly || task.createdByUserid === loggedInUser.id;

    const matchesFacility =
      filters.facility === "all" ||
      task.facilityId === Number(filters.facility);

    const matchesStatus =
      filters.status === "all" || task.status === filters.status;

    const matchesCategory =
      filters.category === "all" || task.taskCategory === filters.category;

    return (
      belongsToUserCity &&
      matchesFacility &&
      matchesStatus &&
      matchesCategory &&
      matchesMyTasks
    );
  });

  return (
    <section className="tasks-container">
      <div className="tasks-toolbar">
        <div className="tasks-toolbar-left">
          <div className="tasks-title-row">
            <h1>tasks</h1>
            <span className="task-count">{filteredTasks.length}</span>
          </div>

          <TaskFilters
            filters={filters}
            setFilters={setFilters}
            facilities={facilities}
            onClearFilters={handleClearFilters}
          />
        </div>

        <button
          type="button"
          className="create-task-button"
          onClick={() => navigate("/tasks/new")}
          aria-label="Create task"
        >
          +
        </button>
      </div>

      <div className="task-table">
        <div className="task-table-header">
          <span>Status</span>
          <span>Category</span>
          <span>Date Submitted</span>
          <span>Shift</span>
          <span>Submitted By</span>
          <span>Description</span>
          <span>Location</span>
          <span>Club</span>
        </div>

        <ul className="tasks">
          {filteredTasks.map((task) => {
            return (
              <TaskRow
                key={task.id}
                task={task}
                facilities={facilities}
                cities={cities}
                users={users}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};
