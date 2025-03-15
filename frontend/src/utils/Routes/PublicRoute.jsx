import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { getTokens, paths } from "../utils";
import { AuthContext } from "../../context/AuthContext";

const PublicRoute = () => {
  const { user } = useContext(AuthContext);
  const tokens = getTokens();

  return tokens.expired ? (
    <Outlet />
  ) : (
    <Navigate replace to={paths[user.role]} />
  );
};

export default PublicRoute;
