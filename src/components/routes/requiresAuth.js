import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import altogic from "../../api/altogic";

const RequiresNotAuth = ({ children }) => {

  const auth = altogic.auth.getSession() && altogic.auth.getSession().token;


  return auth ? children : <Navigate to="/signin" />;
};

export default RequiresNotAuth;
