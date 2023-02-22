import { useEffect } from "react";
import altogic from "../../api/altogic";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import CustomSpinner from "../../components/Spinner";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("action");
    const accsessToken = searchParams.get("access_token");
    const signIn = async () => {
      const resp = await altogic.auth.getAuthGrant();
      if (resp.errors) {
        navigate("/signup", { state: { errors: resp.errors } });
      }
      if (resp.errors === null) {
        navigate("/profile");
        setIsAuth(true);
      }
    };
    if (query === "reset-pwd") {
      navigate(`/reset-password/${accsessToken}`);
    } else {
      signIn();
    }
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
