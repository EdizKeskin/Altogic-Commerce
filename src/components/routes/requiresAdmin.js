import React from "react";
import { Navigate } from "react-router-dom";
import CustomSpinner from "../spinner";
import { useAuth } from "../../context/authContext";

const RequiresAdmin = ({ children }) => {
  const { admin } = useAuth();

  if (admin === undefined) {
    return <CustomSpinner />;
  }

  return admin === true ? <>{children}</> : <Navigate to="/" />;
};

export default RequiresAdmin;
