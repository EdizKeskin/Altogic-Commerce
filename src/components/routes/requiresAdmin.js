import React, {  } from "react";
import { Navigate } from "react-router-dom";

const RequiresAdmin = ({ children, admin }) => {

  return admin === true ? <>{children}</> : <Navigate to="/" />;
};

export default RequiresAdmin;
