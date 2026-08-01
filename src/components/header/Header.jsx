import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("clubTasks_user"));

  const handleLogout = () => {
    setShowMenu(false);
    localStorage.removeItem("clubTasks_user");
    navigate("/login");
  };

  if (!loggedInUser) {
    return null;
  }

  return (
    <header className="app-header">
      <div className="app-logo">
        <h1>|l||l| pulse</h1>
      </div>

      <div className="profile-menu">
        <button
          type="button"
          className="profile-button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="profile-avatar">
            {loggedInUser.firstName.charAt(0)}
            {loggedInUser.lastName.charAt(0)}
          </div>

          <div className="profile-info">
            <span className="profile-name">
              {loggedInUser.firstName} {loggedInUser.lastName}
            </span>

            <span className="profile-role">{loggedInUser.role}</span>
          </div>
        </button>

        {showMenu && (
          <div className="profile-dropdown">
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
