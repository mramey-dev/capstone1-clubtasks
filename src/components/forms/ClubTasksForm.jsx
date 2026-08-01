import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFacilities } from "../services/facilitiesService.js";
import { createTask, updateTask } from "../services/tasksService.js";
import {
  taskCategories,
  taskPriorities,
  taskShifts,
  taskStatuses,
} from "../data/options.js";
import "./ClubTasksForm.css";

const emptyTask = {
  facilityId: "",
  description: "",
  taskCategory: "",
  priority: "",
  status: "open",
  shift: "",
  notes: "",
  attachmentURL: "",
};

export const ClubTasksForm = ({ task, mode, onCancel }) => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("clubTasks_user"));
  const currentTask = mode === "edit" && task ? { ...task } : { ...emptyTask };
  const today = new Date().toISOString().split("T")[0];
  const [facilities, setFacilities] = useState([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState(
    String(currentTask.facilityId || ""),
  );

  useEffect(() => {
    getUserFacilities(loggedInUser.cityId).then((facilitiesArray) => {
      const facilitiesInUserCity = facilitiesArray.filter(
        (facility) => facility.cityId === loggedInUser.cityId,
      );
      setFacilities(facilitiesInUserCity);
    });
  }, [loggedInUser.cityId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const taskToSave = {
      ...currentTask,
      createdByUserId:
        mode === "create" ? loggedInUser.id : currentTask.createdByUserId,
      status: formData.get("status"),
      facilityId: Number(formData.get("facilityId")),
      dateOpened: formData.get("dateOpened"),
      shift: formData.get("shift"),
      taskCategory: formData.get("taskCategory"),
      priority: formData.get("priority"),
      description: formData.get("description"),
      notes: formData.get("notes"),
      attachmentURL: formData.get("attachmentURL"),
    };

    if (mode === "edit") {
      updateTask(taskToSave).then(() => {
        navigate("/");
      });
    }

    if (mode === "create") {
      createTask(taskToSave).then(() => {
        navigate("/");
      });
    }
  };

  const handleCancel = () => {
    if (mode === "edit") {
      onCancel();
    }
    if (mode === "create") {
      navigate("/");
    }
  };

  return (
    <form className="club-task-form" onSubmit={handleSubmit}>
      <h2>{mode === "edit" ? "Edit Task" : "Create Task"}</h2>

      <div className="task-form-fields">
        <label htmlFor="facilityId">Facility:</label>
        <select
          id="facilityId"
          name="facilityId"
          value={selectedFacilityId}
          onChange={(event) => {
            setSelectedFacilityId(event.target.value);
          }}
        >
          <option value="">Select a facility</option>

          {facilities.map((facility) => {
            return (
              <option key={facility.id} value={String(facility.id)}>
                {facility.shortName}, {facility.name}
              </option>
            );
          })}
        </select>

        <label htmlFor="dateOpened">Date</label>
        <input
          id="dateOpened"
          type="date"
          name="dateOpened"
          defaultValue={mode === "create" ? today : currentTask.dateOpened}
        />

        <label htmlFor="shift">Shift</label>
        <select id="shift" name="shift" defaultValue={currentTask.shift || ""}>
          <option value="">Select a shift</option>

          {taskShifts.map((shift) => {
            return (
              <option key={shift.value} value={shift.value}>
                {shift.label}
              </option>
            );
          })}
        </select>

        <label htmlFor="status">Status</label>

        <select
          id="status"
          name="status"
          defaultValue={currentTask.status || "open"}
        >
          {taskStatuses.map((status) => {
            return (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            );
          })}
        </select>

        <label htmlFor="taskCategory">Category</label>
        <select
          id="taskCategory"
          name="taskCategory"
          defaultValue={currentTask.taskCategory || ""}
        >
          <option value="">Select a category</option>

          {taskCategories.map((category) => {
            return (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            );
          })}
        </select>

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          defaultValue={currentTask.priority || ""}
        >
          <option value="">Select a priority</option>

          {taskPriorities.map((priority) => {
            return (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            );
          })}
        </select>

        <label htmlFor="attachmentURL">Image URL</label>
        <input
          id="attachmentURL"
          type="url"
          name="attachmentURL"
          defaultValue={currentTask.attachmentURL || ""}
          placeholder="https://example.com/image.jpg"
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={currentTask.description || ""}
        />

        <label htmlFor="notes">Notes</label>

        <textarea
          id="notes"
          name="notes"
          defaultValue={currentTask.notes || ""}
        />
      </div>

      <div className="task-form-actions">
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>

        <button type="submit">
          {mode === "edit" ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </form>
  );
};
