import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import altogic from "../api/altogic";
import { getUserById } from "../api/storage";

export const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const toast = useToast();
  const [sessions, setSessions] = useState(null);
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [admin, setAdmin] = useState();
  const [owner, setOwner] = useState();
  const [profilePicture, setProfilePicture] = useState(
    require("../assets/pp_blank.png")
  );

  let navigate = useNavigate();

  useEffect(() => {
    const sendReq = async () => {
      const resp = await getAllSessions();
      setSessions(resp.sessions);
    };

    if (altogic.auth.getSession()) {
      setIsAuth(true);
      sendReq();
    }
    if (isAuth === true) {
      async function fetchAdmin() {
        const result = await getUserById(altogic.auth.getUser()._id);
        setAdmin(result.data.admin);
        setOwner(result.data.owner ? result.data.owner : false);
      }
      const pp = altogic.auth.getUser().profilePicture;

      if (pp) {
        setProfilePicture(pp);
      }

      fetchAdmin();
    }
    setUser(user ?? null);
    setSessions(sessions ?? null);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, user]);

  const signOutCurrentSession = async () => {
    try {
      const resp = await altogic.auth.signOut();

      if (resp.errors === null) {
        setIsAuth(false);
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOutSelectedSession = async (token) => {
    const flag = token === altogic.auth.getSession().token;

    try {
      const resp = await altogic.auth.signOut(token);
      if (resp.errors === null) {
        const temp = await getAllSessions();
        setSessions(temp.sessions);
        if (flag) {
          setIsAuth(false);
          navigate("/signin");
        } else {
          toast({
            title: "Success",
            description: "Session has been signed out successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Session could not be signed out.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOutAllSessions = async () => {
    try {
      const resp = await altogic.auth.signOutAll();
      if (resp.errors === null) {
        setIsAuth(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllSessions = async () => {
    try {
      return await altogic.auth.getAllSessions();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const values = {
    isAuth,
    setIsAuth,
    signOutCurrentSession,
    signOutSelectedSession,
    getAllSessions,
    signOutAllSessions,
    sessions,
    user,
    setUser,
    setSessions,
    admin,
    profilePicture,
    setProfilePicture,
    owner
  };

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuth = () => useContext(AuthenticationContext);

export { AuthenticationProvider, useAuth };
