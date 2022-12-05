import { useContext, useEffect } from "react";
import altogic from "../../api/altogic";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/authContext";
import CustomSpinner from "../../components/spinner";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const context = useContext(AuthenticationContext);
  useEffect(() => {
    // We define another function inside the useEffect hook to handle async functionalities.
    const getUrl = async () => {
      // Altogic client library function getAuthGrant() takes one parameter, which is access_token.It updates the session and user information on localStorage.
      // If you don't pass a parameter to getAuthGrant() function, it automatically fetches the access_token from the URL. If no access token present in URL,
      // it raises an error.
      const resp = await altogic.auth.getAuthGrant();
      if (resp.errors === null) {
        navigate("/profile");
        context.setIsAuth(true);
      }
    };
    getUrl();
  }, []);

  return (
    <>
      <div>
        <CustomSpinner />
      </div>
    </>
  );
};

export default AuthRedirect;
