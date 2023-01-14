import React from "react";
import { Navigate } from "react-router-dom";
import altogic from "../../api/altogic";

const RequiresNotAuth = ({ children }) => {
  const auth = altogic.auth.getSession() && altogic.auth.getSession().token;

  return auth ? <Navigate to="/" /> : children;
};

export default RequiresNotAuth;
