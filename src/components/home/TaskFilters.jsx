import { taskCategories, taskStatuses } from "../data/options.js";

export const TaskFilters = ({
  filters,
  setFilters,
  facilities,
  onClearFilters,
}) => {
  return (
    <div className="task-filters">
      <select
        value={filters.facility}
        onChange={(event) => {
          setFilters({
            ...filters,
            facility: event.target.value,
          });
        }}
      >
        <option value="all">All Facilities</option>

        {facilities.map((facility) => {
          return (
            <option key={facility.id} value={facility.id}>
              {" "}
              {facility.name}
            </option>
          );
        })}
      </select>

      <select
        value={filters.status}
        onChange={(event) => {
          setFilters({ ...filters, status: event.target.value });
        }}
      >
        <option value="all">All Statuses</option>

        {taskStatuses.map((status) => {
          return (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          );
        })}
      </select>

      <select
        value={filters.category}
        onChange={(event) => {
          setFilters({
            ...filters,
            category: event.target.value,
          });
        }}
      >
        <option value="all">All Categories</option>

        {taskCategories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="clear-filters-button"
        onClick={onClearFilters}
      >
        Reset
      </button>
    </div>
  );
};
