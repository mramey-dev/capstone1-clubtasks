import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClubTasksForm } from "./ClubTasksForm.jsx";
import { deleteTask, getTaskById } from "../services/tasksService.js";
import { getAllFacilities } from "../services/facilitiesService.js";
import { getAllUsers } from "../services/userService.js";
import "./TaskDetails.css";

export const TaskDetails = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("clubTasks_user"));
  const [task, setTask] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);

  const getAndSetTask = () => {
    getTaskById(taskId).then((taskObject) => {
      setTask(taskObject);
    });
  };

  useEffect(() => {
    getAndSetTask();

    getAllUsers().then((usersArray) => {
      setUsers(usersArray);
    });
    getAllFacilities().then((facilitiesArray) => {
      setFacilities(facilitiesArray);
    });
  }, [taskId]);

  const handleDelete = () => {
    deleteTask(task).then(() => {
      navigate("/");
    });
  };

  if (!task) {
    return <p>Loading task...</p>;
  }
  const canDelete =
    loggedInUser.role === "manager" || loggedInUser.id === task.createdByUserId;

  const canEdit =
    loggedInUser.role === "manager" || loggedInUser.id === task.createdByUserId;

  const facility = facilities.find(
    (facility) => facility.id === task.facilityId,
  );

  const createdByUser = users.find((user) => user.id === task.createdByUserId);

  return (
    <section className="task-details-page">
      <div className="task-details-panel">
        <button
          type="button"
          className="task-close-button"
          onClick={() => {
            if (isEditing) {
              setIsEditing(false);
            } else {
              navigate("/");
            }
          }}
        >
          x
        </button>

        {isEditing ? (
          <ClubTasksForm
            mode="edit"
            task={task}
            onCancel={() => setIsEditing(false)}
            onTaskUpdated={getAndSetTask}
          />
        ) : (
          <>
            <div className="task-panel-heading">
              <h2>Task Details</h2>

              <div className="task-details-actions">
                {canDelete && (
                  <button
                    type="button"
                    className="task-delete-button"
                    onClick={handleDelete}
                  >
                    Delete Task
                  </button>
                )}

                {canEdit && (
                  <button
                    type="button"
                    className="task-primary-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Task
                  </button>
                )}
              </div>
            </div>

            <div className="task-fields">
              <span className="task-field-label">Facility</span>
              <div className="task-field-value">
                {facility ? `${facility.shortName}, ${facility.name}` : ""}
              </div>

              <span className="task-field-label">Created By</span>
              <div className="task-field-value">
                {createdByUser
                  ? `${createdByUser.firstName} ${createdByUser.lastName}`
                  : ""}
              </div>

              <span className="task-field-label">Date Created</span>
              <div className="task-field-value task-url-value">
                {task.dateOpened || ""}
              </div>

              <span className="task-field-label">ImageURL</span>
              <div className="task-field-value task-url-value">
                {task.attachmentURL || ""}
              </div>

              <span className="task-field-label">Shift</span>
              <div className="task-field-value">{task.shift || ""}</div>

              <span className="task-field-label">Status</span>
              <div className="task-field-value">{task.status || ""}</div>

              <span className="task-field-label">Category</span>
              <div className="task-field-value">{task.taskCategory || ""}</div>

              <span className="task-field-label">Priority</span>
              <div className="task-field-value">{task.priority || ""}</div>

              <span className="task-field-label">Description</span>
              <div className="task-field-value task-description-value">
                {task.description || ""}
              </div>

              <span className="task-field-label">Notes</span>
              <div className="task-field-value task-description-value">
                {task.notes || ""}
              </div>
            </div>

            {task.attachmentURL && (
              <img
                src={task.attachmentURL}
                alt={task.description}
                className="task-image"
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};
