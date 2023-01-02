import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserById } from "../../api/storage";
import altogic from "../../api/altogic";
import CustomSpinner from "../spinner";

const RequiresAdmin = ({ children }) => {
  const [admin, setAdmin] = useState();

  useEffect(() => {
    async function fetchUser() {
      const result = await getUserById(altogic.auth.getUser()._id);
      setAdmin(result.data.admin);
    }
    fetchUser();
  }, []);
  if (admin === undefined) {
    return <CustomSpinner />;
  }

  return admin === true ? <>{children}</> : <Navigate to="/" />;
};

export default RequiresAdmin;
