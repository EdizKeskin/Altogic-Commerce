import { useEffect } from "react";
import altogic from "../../api/altogic";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import CustomSpinner from "../../components/Spinner";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  useEffect(() => {
    const getUrl = async () => {
      const resp = await altogic.auth.getAuthGrant();
      if (resp.errors) {
        navigate("/signup", { state: { errors: resp.errors } });
      }
      if (resp.errors === null) {
        navigate("/profile");
        setIsAuth(true);
      }
    };
    getUrl();
    //eslint-disable-next-line
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
