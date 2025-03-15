import React, { useContext } from "react";

import { Avatar } from "@mui/material";

import { Link, Route, Routes, useNavigate } from "react-router";

import ButtonTertiary from "../../../UI/Buttons/ButtonTertiary";
import ButtonQuaternary from "../../../UI/Buttons/ButtonQuaternary";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { Stack } from "@mui/material";
import LogInForm from "./AuthForms/LogInForm";
import SignUpForm from "./AuthForms/SignUpForm";
import PublicRoute from "../../../utils/Routes/PublicRoute";
import { AuthContext } from "../../../context/AuthContext";

import { logOut, paths } from "../../../utils/utils";

// import ProfileMenu from "./ProfileMenu/ProfileMenu";

const Content = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut(setUser);
    navigate("/", { replace: true });
  };

  return !Boolean(user.full_name) ? (
    <Stack direction={"row"} gap={2}>
      <Link to="signup/" tabIndex={-1}>
        <ButtonQuaternary tabIndex={-1} startIcon={<SaveAltIcon />}>
          Registrarse
        </ButtonQuaternary>
      </Link>
      <Link to="login/" tabIndex={-1}>
        <ButtonTertiary tabIndex={-1} startIcon={<LoginIcon />}>
          Ingresar
        </ButtonTertiary>
      </Link>
    </Stack>
  ) : (
    <Stack direction={"row"} gap={2}>
      <Link to="/student" tabIndex={-1}>
        <ButtonQuaternary
          tabIndex={-1}
          startIcon={
            <Avatar
              alt={String(user.id)}
              src={user.photo}
              sx={{ width: 24, height: 24 }}
            />
          }
        >
          {user.full_name}
        </ButtonQuaternary>
      </Link>
      <ButtonTertiary
        tabIndex={-1}
        startIcon={<LogoutIcon />}
        onClick={handleLogOut}
      >
        Salir
      </ButtonTertiary>
    </Stack>
  );
};

const Auth = () => {
  return (
    <>
      <Content />
      <Routes>
        <Route element={<PublicRoute redirectPath="/" />}>
          <Route path="login/*" element={<LogInForm />} />
          <Route path="signup/" element={<SignUpForm />} />
        </Route>
      </Routes>
    </>
  );
};

export default Auth;
