import { TaskList } from "./components/home/TaskList.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClubTasksForm } from "./components/forms/ClubTasksForm.jsx";
import { TaskDetails } from "./components/forms/TaskDetails.jsx";
import { Login } from "./components/login/Login.jsx";
import { Header } from "./components/header/Header.jsx";
import "./components/home/homePage.css";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="app-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<TaskList />} />
            <Route
              path="/tasks/new"
              element={<ClubTasksForm mode="create" />}
            />
            <Route path="/tasks/:taskId" element={<TaskDetails />} />
          </Routes>
        </main>
        <footer className="app-footer"></footer>
      </div>
    </BrowserRouter>
  );
};
