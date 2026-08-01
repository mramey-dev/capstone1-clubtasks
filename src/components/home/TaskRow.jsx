import { useNavigate } from "react-router-dom";
import { taskCategories, taskShifts, taskStatuses } from "../data/options";

export const TaskRow = ({ task, facilities, cities, users }) => {
  const navigate = useNavigate();

  const facility = facilities.find(
    (facility) => facility.id === task.facilityId,
  );

  const city = cities.find((city) => city.id === facility?.cityId);
  const createdByUser = users.find((user) => user.id === task.createdByUserId);
  const status = taskStatuses.find((status) => status.value === task.status);
  const category = taskCategories.find(
    (category) => category.value === task.taskCategory,
  );
  const shift = taskShifts.find((shift) => shift.value === task.shift);

  return (
    <li className="task">
      <button
        type="button"
        className="task-row-button"
        onClick={() => navigate(`/tasks/${task.id}`)}
      >
        <span>{status?.label ?? "-"}</span>
        <span>{category?.label ?? "-"}</span>
        <span>{task.dateOpened}</span>
        <span>{shift?.label ?? "-"}</span>
        <span>
          {createdByUser
            ? `${createdByUser.firstName} ${createdByUser.lastName}`
            : ""}
        </span>
        <span>{task.description}</span>
        <span>{city ? `${city.name}, ${city.stateAbv}` : "-"}</span>
        <span>{facility?.shortName ?? "-"}</span>
      </button>
    </li>
  );
};
