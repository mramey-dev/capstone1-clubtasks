import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../services/userService";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    getUserByEmail(email).then((users) => {
      const matchedUser = users[0];

      if (matchedUser) {
        localStorage.setItem("clubTasks_user", JSON.stringify(matchedUser));
        navigate("/");
      }
    });
  };
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="app-logo">
          <h1>|l||l| pulse</h1>
        </div>
        <h2>Login</h2>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
