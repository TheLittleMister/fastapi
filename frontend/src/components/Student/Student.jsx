import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router";

import { AuthContext } from "../../context/AuthContext";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import TimelapseIcon from "@mui/icons-material/Timelapse";

import Panel from "../../UI/Panels/Panel";
import Profile from "../Interface/Profile/Profile";

import PomodoroTimer from "../Interface/Pomodoro/PomodoroTimer";
import Tasks from "../Interface/Tasks/Tasks";

const Student = () => {
  const { user, setUser } = useContext(AuthContext);

  const tabs = [
    {
      options: {
        icon: <AccountCircleIcon />,
        iconPosition: "top",
        label: "Perfil",
      },
      link: "/student/profile",
    },
    {
      options: {
        icon: <PlaylistAddCheckIcon />,
        iconPosition: "top",
        label: "Tareas",
      },
      link: "/student/tasks",
    },
    {
      options: {
        icon: <TimelapseIcon />,
        iconPosition: "top",
        label: "Pomodoro",
      },
      link: "/student/pomodoro",
    },
    {
      options: {
        icon: <AutoStoriesIcon />,
        iconPosition: "top",
        label: "Cursos",
      },
      link: "/student/courses",
    },
  ];

  const panelOptions = {
    tabs,
    user,
    setUser,
  };

  return (
    <Routes>
      <Route
        path="profile/*"
        element={
          <Panel {...panelOptions}>
            <div>This would be my profile</div>
            {/*<Profile user={user} setUser={setUser} />*/}
          </Panel>
        }
      />
      <Route
        path="tasks/*"
        element={
          <Panel {...panelOptions}>
            <div>This would be my tasks</div>
            {/*<Tasks user={user} setUser={setUser} />*/}
          </Panel>
        }
      />
      <Route
        path="pomodoro/*"
        element={
          <Panel {...panelOptions}>
            <PomodoroTimer /> {/* Aquí se incluye el temporizador Pomodoro */}
          </Panel>
        }
      />
      <Route
        path="courses/*"
        element={
          <Panel {...panelOptions}>
            <div>This would be my courses</div>
          </Panel>
        }
      />
      <Route path="*" element={<Navigate replace to="tasks/" />} />
    </Routes>
  );
};

export default Student;
