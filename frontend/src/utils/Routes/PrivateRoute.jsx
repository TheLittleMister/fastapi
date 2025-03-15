import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { getTokens } from "../utils";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ allowRoles }) => {
  const { user } = useContext(AuthContext);
  const tokens = getTokens();

  return !tokens.expired && allowRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  );
};

export default PrivateRoute;
