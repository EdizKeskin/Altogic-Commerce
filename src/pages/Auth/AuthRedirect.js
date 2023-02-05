import { useEffect } from "react";
import altogic from "../../api/altogic";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import CustomSpinner from "../../components/Spinner";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  let [searchParams] = useSearchParams();

  const query = searchParams.get("action");
  const accsessToken = searchParams.get("access_token");

  useEffect(() => {
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
    console.log(query);
    if (query === "oauth-signin") {
      signIn();
    } else if (query === "reset-pwd") {
      navigate(`/reset-password/${accsessToken}`);
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
